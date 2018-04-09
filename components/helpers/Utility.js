export function formatDuration(duration_ms) {
	const mins = Math.floor(duration_ms / 60000);
	const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
	
	return `${mins}: ${(seconds < 10 ? '0' : '') + seconds}`;
}