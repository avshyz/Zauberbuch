import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        characters: [
            { id: 1, name: 'Brieuc' },
        ],
    };
}) satisfies PageServerLoad;