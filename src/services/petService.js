const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL);
        return res.json();
    } catch (err) {
        console.log(err);
    };
};

const create = async (FormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(FormData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    };
};

const update = async (FormData, petId) => {
    try {
        const res = await fetch(`${BASE_URL}/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(FormData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    };
};

const deletePet = async (petId) => {
    try {
        const res = await fetch(`${BASE_URL}/${petId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'applications/json',
            }
        });
        return res.json();
    } catch (err) {
        console.log(err);
    };
};

console.log(await index());

export {
    index,
    create,
    update,
    deletePet
};