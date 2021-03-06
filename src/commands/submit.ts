"use strict";

import * as vscode from "vscode";
import { leetCodeExecutor } from "../leetCodeExecutor";
import { leetCodeManager } from "../leetCodeManager";
import { DialogType, promptForOpenOutputChannel, promptForSignIn, showResultFile } from "../utils/uiUtils";
import { getActivefilePath } from "../utils/workspaceUtils";

export async function submitSolution(uri?: vscode.Uri): Promise<void> {
    if (!leetCodeManager.getUser()) {
        promptForSignIn();
        return;
    }

    const filePath: string | undefined = await getActivefilePath(uri);
    if (!filePath) {
        return;
    }

    try {
        const result: string = await leetCodeExecutor.submitSolution(filePath);
        await showResultFile(result);
    } catch (error) {
        await promptForOpenOutputChannel("Failed to submit the solution. Please open the output channel for details.", DialogType.error);
    }
}
