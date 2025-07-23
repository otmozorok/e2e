import type { StoreonStore } from 'storeon';
import type { Events, State } from '../../store';

export function storeLogger(skip: boolean) {
	if (skip) return function () {};
	return function (store: StoreonStore<State, Events>) {
		store.on('@dispatch', (_, [event, data]) => {
			console.log(`Storeon: [${event}] with `, data);
		});
	};
}
