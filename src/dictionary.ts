import NSpell from "nspell";
import dictionary from "./dictionaries/en/index.js";

const spell = new NSpell(dictionary);

export const checkSpelling = (text: string) => {
    const results: string[] = [];

    if (spell) {
        const words = text.split(/[^\w']+/g);
        for (const word of words) {
            if (!word) continue;
            if (word.toUpperCase() === word) continue;

            const suggestions = spell.suggest(word);
            if (suggestions.length > 0) {
                const mapped = suggestions.map(x => `"${x}"`);
                const text = mapped.length >= 3 ? `${mapped.slice(0, -1).join(", ")}, or ${mapped[mapped.length - 1]}` : mapped.join(" or ");
                results.push(`"${word}" might be spelled ${text}.`);
            }
        }
    }

    return results;
};