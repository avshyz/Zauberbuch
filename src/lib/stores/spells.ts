import type { Spell } from '$lib/types';
import { BaseDirectory, readTextFile, writeTextFile, exists } from '@tauri-apps/api/fs';
import { writable } from 'svelte/store';

function createStore() {
	const { subscribe, update, set } = writable<Spell[]>([]);

	return {
		subscribe,
		actions: {
			init: async () => {
				if (await exists('spells.json', { dir: BaseDirectory.AppConfig })) {
					const content = await readTextFile('spells.json', { dir: BaseDirectory.AppConfig });
					set(JSON.parse(content));
				}
				subscribe((spells) => {
					writeTextFile('spells.json', JSON.stringify(spells), { dir: BaseDirectory.AppConfig });
				});
			},
			saveSpell: (spell: Spell) => update((spells) => [...spells, spell]),
			deleteSpell: (spell: Spell) => update((spells) => spells.filter((s) => s.name !== spell.name))
		}
	};
}

export const spellStore = createStore();
