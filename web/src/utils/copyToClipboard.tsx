export default function copyToClipboard(code: string): Promise<void> {
    alert(`Trainer Code #${code} copied to clipboard!`);
    return navigator.clipboard.writeText(code);
}