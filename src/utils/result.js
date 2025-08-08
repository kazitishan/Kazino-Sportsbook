export async function getResult(link) {
    const res = await fetch(`http://localhost:3000/api/result?link=${encodeURIComponent(link)}`);
    
    if (!res.ok) {
        let errorMessage = `HTTP error! status: ${res.status}`;
        try {
            const errorData = await res.json();
            if (errorData.error) {
                errorMessage = errorData.error;
            }
        } catch (e) {
        }
        
        throw new Error(errorMessage);
    }
    
    return res.json();
}