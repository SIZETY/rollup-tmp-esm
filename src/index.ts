export const foo = (a: string) => {
	console.log(new Set([1]))
	document.write('hello world!' + a)
}

export const clone = <T>(a: T): T => {
	return JSON.parse(JSON.stringify(a))
}
