import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MovieCard = ({id,poster_path,title,vote_average,release_date}:Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image
            source={{
                uri:poster_path
                ?`https://image.tmdb.org/t/p/w500${poster_path}`
                :`https://placeholder.co/600*400/1a1a1a/ffffff.png`
            }}
            className='w-full rounded-lg h-52'
            resizeMode='cover'
            />
            <Text className='font-bold text-sm text-white mt-2'>{title}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard