/** @format */

const db = new Dexie('Color');

db.version(0.1).stores({
	color: `&time, count, code`,
});

function Put(value) {
	db.color.put(value);
}

// 放回全部
async function All() {
	return await db.color.toArray();
}

async function Delete(KEY) {
	return await db.color.delete(KEY);
}
