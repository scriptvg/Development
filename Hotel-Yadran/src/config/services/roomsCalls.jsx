const API_URL = 'http://localhost:3001/rooms';

async function GetRooms() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw new Error('Failed to fetch rooms: ' + error.message);
    }
}

async function GetRoomById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching room by id:', error);
        throw new Error('Failed to fetch room by id: ' + error.message);
    }
}

async function AddRoom(roomData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomData),
        });
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorDetails.message}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding room:', error);
        throw new Error('Failed to add room: ' + error.message);
    }
}

async function UpdateRoom(roomData) {
    try {
        const response = await fetch(`${API_URL}/${roomData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomData),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al actualizar habitación: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating room:', error);
        throw new Error('Failed to update room: ' + error.message);
    }
}

async function DeleteRoom(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar habitación');
        }
    } catch (error) {
        console.error('Error deleting room:', error);
        throw new Error('Failed to delete room: ' + error.message);
    }
}

export default { GetRooms, GetRoomById, AddRoom, UpdateRoom, DeleteRoom };