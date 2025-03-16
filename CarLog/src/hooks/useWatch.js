import { useContext, useEffect, useState } from 'react'


import * as watchService from '../services/watchService'
import * as cars from '../services/carService'
import AuthContext from '../context/AuthContext';

export default function useWatch(carId) {
    const { auth } = useContext(AuthContext)
    const [watchersList, setWatchersList] = useState([]);
    const [watched, setWatchedList] = useState([]);
    const [isWatched, setIsWatched] = useState(false)
    const [listId, setListId] = useState('');
    const [allList, setAllLists] = useState([]);

    useEffect(() => {
        watchService.getAll()
            .then(data => {  
                             
                if (carId){
                    const list = data.filter(r => r.carId === carId)[0].watchers
                    const id = data.filter(r => r.carId === carId)[0]._id
                    setWatchersList(list);
                    setListId(id);  
                }
                setAllLists(data)          
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
    
    const getWached = async () => {
        console.log('u r here');
        
        if (allList.length === 0){
            return []
        }

        let carIds = [];
        allList.filter(l => {

            if(l.watchers.includes(auth.id)){
                carIds.push(l.carId)
            }
            
        })

        console.log(carIds);
        
        
        const result = await cars.getAll();
        
        let watched = [];
        result.filter(r => {
            if (carIds.includes(r._id)){
                watched.push(r)
            }
            
        })
        
        setWatchedList(watched);
        return watched;
        
         
        
    }
    
    return {
        isWatched,
        allList,
        watched,
        addToWached,
        getWached,
    }
}