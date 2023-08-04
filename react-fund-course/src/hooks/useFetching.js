import { useState } from "react"

export const useFetcheng = function(callback) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args);
            setIsLoading(false);
        } catch(e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}