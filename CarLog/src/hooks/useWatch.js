import { useContext, useEffect, useState } from 'react'


import * as watchService from '../services/watchService'
import * as cars from '../services/carService'
import AuthContext from '../context/AuthContext';

export default function useWatch(carId) {
    const { auth } = useContext(AuthContext)
    const [watchersList, setWatchersList] = useState([]);
    const [isWatched, setIsWatched] = useState(false)
    const [listId, setListId] = useState('')

    useEffect(() => {
        watchService.getAll(carId)
            .then(data => {
                
                const list = Object.values(data).filter(r => r.carId === carId)[0].watchers
                const id = Object.values(data).filter(r => r.carId === carId)[0]._id
                setWatchersList(list);
                setListId(id);            
            })
    },[])
    useEffect(() => {
        setIsWatched(false)
        if(watchersList?.includes(auth.id)){
            setIsWatched(true)
        }
    }, [watchersList])

    const addToWached = async () => {
        const list = [...watchersList, auth.id]
        const data = {
            "_id": listId,
            carId,
            "watchers": list
        }
        
        
        await watchService.addToList(listId, data)

        setWatchersList(list);
    }
    
    return {
        watchedList: watchersList,
        isWatched,
        addToWached
    }
}