import { writable } from 'svelte/store'
export const installable = writable({ instance: null, supported: false });