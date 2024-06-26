"use client";

import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { Button } from "@winston/ui/button";
import { CLEAR_EDITOR_COMMAND } from "lexical";
import { useCallback, useEffect, useState } from "react";
import { useSaveState } from "./editor.atoms";
import type { FileType } from "./file-explorer";
import { SpeechRecognitionShortcutPlugin } from "./speech-recognition-recorder";

const themeClass: InitialConfigType["theme"] = {
	code: "font-mono",
	heading: {
		h1: "text-4xl font-semibold leading-tight pb-5",
		h2: "text-3xl font-semibold leading-tight pb-4",
		h3: "text-2xl font-semibold leading-tight pb-3",
		h4: "text-xl font-semibold leading-tight pb-2",
		h5: "text-lg font-semibold leading-tight pb-1",
	},
	image: "editor-image",
	link: "editor-link",
	list: {
		listitem: "ps-2",
		nested: {
			listitem: "list-none",
		},
		ol: "list-decimal py-5 ps-6",
		ul: "list-disc py-5 ps-6",
	},
	ltr: "ltr",
	rtl: "rtl",
	paragraph: "py-2",
	quote: "py-2 px-3 border-s-4 border-primary m-2",
	placeholder: "text-muted-foreground",
	text: {
		bold: "font-bold",
		code: "font-mono tracking-wider",
		italic: "italic",
		strikethrough: "line-through",
		underline: "underline",
		underlineStrikethrough: "[text-decoration:underline_line-through]",
		subscript: "subs",
		superscript: "sups",
		highlight: "bg-green-200",
	},
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
const onError: InitialConfigType["onError"] = function onError(error) {
	console.error(error);
};

export function SaveDocumentButton({ targetFile }: { targetFile?: FileType }) {
	const [saveState, setSaveState] = useSaveState();

	const { saveEditorToFile } = useSaveEditorToFile();
	const onClickSave = async () => {
		setSaveState("saving");
		await saveEditorToFile({
			targetFile,
		});
		setSaveState("saved");
	};

	return (
		<Button
			disabled={saveState !== "unsaved"}
			variant={"secondary"}
			onClick={onClickSave}
		>
			{saveState}
		</Button>
	);
}

export const useSaveEditorToFile = () => {
	const [editor] = useLexicalComposerContext();
	const saveEditorToFile = useCallback(
		async ({ targetFile }: { targetFile?: FileType }) => {
			const editorState = editor.getEditorState();
			const serializedEditorState = editorState.toJSON();

			console.log("serializedEditorState", serializedEditorState);
			if (targetFile) {
				// potentially throw Error('Other writer have not been closed');
				const writer = await targetFile.createWriter();
				await writer.truncate(0);
				await writer.write(JSON.stringify(serializedEditorState));
				await writer.close();
			}
		},
		[editor],
	);
	return { saveEditorToFile };
};

export function AlertUnsavedStatePlugin() {
	const [, setSaveState] = useSaveState();

	return (
		<OnChangePlugin
			onChange={() => {
				setSaveState("unsaved");
			}}
		/>
	);
}

export function AutoSaveToFilePlugin({
	targetFile,
	autoSaveInterval = 5_000,
}: { targetFile?: FileType; autoSaveInterval?: number }) {
	const { saveEditorToFile } = useSaveEditorToFile();
	const [saveState, setSaveState] = useSaveState();

	useEffect(() => {
		const onAutoSave = async () => {
			if (saveState !== "unsaved") {
				return;
			}
			console.log("saving editor state...");
			await saveEditorToFile({
				targetFile,
			});
			setSaveState("auto-saved");
		};
		const interval = setInterval(onAutoSave, autoSaveInterval);
		return () => clearInterval(interval);
	}, [autoSaveInterval, saveState, setSaveState, saveEditorToFile, targetFile]);

	return null;
}

export function AutoLoadFromFilePlugin({
	sourceFile,
}: { sourceFile?: FileType }) {
	const [editor] = useLexicalComposerContext();
	const [, setSaveState] = useSaveState();

	useEffect(() => {
		sourceFile?.text().then((text) => {
			try {
				console.log("text", text);
				const state = editor.parseEditorState(text);
				editor.setEditorState(state);
				setSaveState("saved");
			} catch (_) {
				// If the file is not a valid JSON, we don't want to load it
				editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
			}
		});
	}, [editor, sourceFile, setSaveState]);

	return null;
}

export function Editor({ sourceFile }: { sourceFile?: FileType }) {
	const initialConfig: InitialConfigType = {
		namespace: "RTE",
		theme: themeClass,
		onError,
		nodes: [
			HorizontalRuleNode,
			CodeNode,
			HeadingNode,
			LinkNode,
			ListNode,
			ListItemNode,
			QuoteNode,
		],
	};

	const [recentlyHeard, setRecentlyHeard] = useState<string>("");
	const [mostRecentAction, setMostRecentAction] = useState<string>("");

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className="flex flex-col gap-3">
				<div className="flex gap-2 justify-between">
					<SpeechRecognitionShortcutPlugin
						setHeardWords={setRecentlyHeard}
						setShortcutAction={setMostRecentAction}
					/>
					<SaveDocumentButton />
				</div>

				<div className="relative">
					<RichTextPlugin
						contentEditable={
							<ContentEditable className=" min-h-80 text-base caret-yellow-500 outline-none px-4 pt-4 pb-6 bg-secondary text-secondary-foreground rounded-md" />
						}
						placeholder={
							<div className="absolute text-muted-foreground top-6 left-5 pointer-events-none select-none">
								Type to start writing...
							</div>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<MarkdownShortcutPlugin transformers={TRANSFORMERS} />
					<ListPlugin />
					<TabIndentationPlugin />
					<HistoryPlugin />
					<AutoSaveToFilePlugin targetFile={sourceFile} />
					<AutoLoadFromFilePlugin sourceFile={sourceFile} />
					<AutoFocusPlugin defaultSelection="rootEnd" />
					<AlertUnsavedStatePlugin />
					<ClearEditorPlugin />
				</div>
				<div>
					<span className="text-muted-foreground">Last heard words: </span>{" "}
					{recentlyHeard}
				</div>
				<div>
					<span className="text-muted-foreground">Most recent action: </span>{" "}
					{mostRecentAction}
				</div>
			</div>
		</LexicalComposer>
	);
}
