export default function copyToClipboard(code: string): Promise<void> {
    return navigator.clipboard.writeText(code);
}