import { useContext, useEffect, useState } from 'react'


import * as watchService from '../services/watchService'
import * as cars from '../services/carService'
import AuthContext from '../context/AuthContext';
import ErrorContext from '../context/ErrorContext';

export default function useWatch(carId) {
    const { auth } = useContext(AuthContext)
    const [watchersList, setWatchersList] = useState([]);
    const [watched, setWatchedList] = useState([]);
    const [isWatched, setIsWatched] = useState(false)
    const [listId, setListId] = useState('');
    const [allList, setAllLists] = useState([]);
    const { errorSetter } = useContext(ErrorContext);

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
            .catch((err)=> {
                errorSetter(err)
            })
    },[])
    useEffect(() => {
        setIsWatched(false)
        if(watchersList?.includes(auth.id)){
            setIsWatched(true)
        }
    }, [watchersList])

    const addToWatched = async () => {
        const list = [...watchersList, auth.id]
        const data = {
            "_id": listId,
            carId,
            "watchers": list
        }
        
        try {
            await watchService.addToList(listId, data)
    
            setWatchersList(list);
            
        } catch (error) {
            errorSetter(error)
        }
    }
    
    const getWatched = async () => {
        
        if (allList.length === 0){
            return []
        }

        let carIds = [];
        allList.filter(l => {

            if(l.watchers.includes(auth.id)){
                carIds.push(l.carId)
            }
            
        })

        try {
            const result = await cars.getAll();
            
            let watched = [];
            result.filter(r => {
                if (carIds.includes(r._id)){
                    watched.push(r)
                }
                
            })
            
            setWatchedList(watched);
            return watched;
            
            
        } catch (error) {
            errorSetter(error)
        }
        
         
        
    }
    
    return {
        isWatched,
        allList,
        watched,
        addToWatched,
        getWatched,
    }
}