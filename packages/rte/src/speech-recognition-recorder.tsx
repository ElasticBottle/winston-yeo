"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Mic } from "@winston/ui";
import { Toggle } from "@winston/ui/toggle";
import {
	$getSelection,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	UNDO_COMMAND,
} from "lexical";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";

export const SpeechRecognitionShortcutPlugin = ({
	setHeardWords,
	setShortcutAction,
}: {
	setHeardWords: Dispatch<SetStateAction<string>>;
	setShortcutAction: Dispatch<SetStateAction<string>>;
}) => {
	const [editor] = useLexicalComposerContext();

	const autoStartCount = useRef(0);
	const lastStartedAt = useRef(new Date().getTime());
	const recognitionRef = useRef<SpeechRecognition | null>(null);
	const isInsertRef = useRef(false);

	const startRecording = async () => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			alert(
				"Speech Recognition is not supported in this browser. Try again with another browser.",
			);
			return;
		}
		const recognition = new SpeechRecognition();
		recognitionRef.current = recognition;
		recognition.continuous = true;
		recognition.lang = "en-US";
		recognition.interimResults = true;
		recognition.maxAlternatives = 0;

		recognition.onresult = (event) => {
			const result = event.results[event.resultIndex];
			if (!result?.isFinal) {
				return;
			}
			const transcript = result.item(0);
			console.log("transcript", transcript);

			const spokenWords = transcript.transcript;
			setHeardWords(spokenWords);

			const boldRegex =
				/(bold|cold|both|coldness|bowl|colt|boat|coat|boldness)/i;
			const italicsRegex = /(metallic|italic|i tell you)/i;
			const underlineRegex = /(underline|on the line)/i;
			const strikeThroughRegex = /(strike)/i;
			const codeRegex = /(code|court)/i;
			const undoRegex = /(undo|and do)/i;
			const redoRegex = /(redo|we do)/i;
			const insertRegex = /(inside|insert|answer)/i;
			const endInsertRegex = /(end|and) (inside|insert|then set)/i;

			if (isInsertRef.current) {
				editor.update(() => {
					if (endInsertRegex.test(spokenWords)) {
						console.log("ending insert");
						setShortcutAction("Ending Speech to text");
						isInsertRef.current = false;
					}
					const selection = $getSelection();
					if (selection) {
						console.log("selection", selection);
						selection.insertText(spokenWords.replace(endInsertRegex, ""));
						selection.getNodes()[0]?.selectEnd();
					}
				});
				return;
			}

			if (boldRegex.test(spokenWords)) {
				console.log("bolding");
				setShortcutAction("bolding");
				editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
			}
			if (italicsRegex.test(spokenWords)) {
				console.log("italicizing");
				setShortcutAction("italicizing");
				editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
			}
			if (underlineRegex.test(spokenWords)) {
				console.log("underlining");
				setShortcutAction("underlining");
				editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
			}
			if (strikeThroughRegex.test(spokenWords)) {
				console.log("striking through");
				setShortcutAction("striking through");
				editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
			}
			if (codeRegex.test(spokenWords)) {
				console.log("striking through");
				setShortcutAction("codifying");
				editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
			}
			if (redoRegex.test(spokenWords)) {
				console.log("redoing");
				setShortcutAction("redoing");
				editor.dispatchCommand(REDO_COMMAND, undefined);
			}
			if (undoRegex.test(spokenWords)) {
				console.log("undoing");
				setShortcutAction("undoing");
				editor.dispatchCommand(UNDO_COMMAND, undefined);
			}
			if (insertRegex.test(spokenWords)) {
				console.log(`setting insert to ${!isInsertRef.current}`);
				setShortcutAction("Begin speech to text insertion");
				isInsertRef.current = !isInsertRef.current;
			}
		};

		recognition.onend = () => {
			const timeSinceLastStart = new Date().getTime() - lastStartedAt.current;
			autoStartCount.current += 1;
			if (autoStartCount.current % 10 === 0) {
				alert(
					"Speech Recognition is running into issues. Try restarting the page.",
				);
				console.warn(
					"Speech Recognition is repeatedly stopping and starting. See http://is.gd/annyang_restarts for tips.",
				);
			}
			if (timeSinceLastStart < 1000) {
				setTimeout(() => {
					recognition.start();
				}, 1000 - timeSinceLastStart);
			} else {
				recognition.start();
			}
		};
		recognition.onnomatch = (event) => {
			console.log("event", event);
		};
		recognition.onerror = (event) => {
			console.log("event", event);
		};
		recognition.start();
	};

	const stopRecording = () => {
		if (!recognitionRef.current) {
			return;
		}
		recognitionRef.current.onend = null;
		recognitionRef.current.stop();
	};

	const [isRecording, setIsRecording] = useState(false);

	const onToggle = (pressed: boolean) => {
		if (pressed) {
			startRecording();
		} else {
			stopRecording();
		}
		setIsRecording(pressed);
	};

	let enableToggleText = "Enable voice shortcut";
	if (isRecording) {
		enableToggleText = "Disable voice shortcut";
	}

	return (
		<div className="w-fit">
			<Toggle
				aria-label="Toggle voice shortcut"
				className="gap-1"
				size={"sm"}
				pressed={isRecording}
				onPressedChange={onToggle}
			>
				<Mic size={17} /> {enableToggleText}
			</Toggle>
		</div>
	);
};
