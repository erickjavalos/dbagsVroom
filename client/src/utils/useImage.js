import { useEffect, useState } from 'react'

const useImage = (fileName) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        const fetchImage = async () => {
            console.log("fetching...")
            try {
                console.log('getting image..')
                const response = await import(`../assets/${fileName}`) // change relative path to suit your needs
                console.log('settting image')
                console.log(response.default)
                setImage(response.default)
            } catch (err) {
                console.log("error")
                console.log(err)
                setError(err)
            } finally {

                console.log("response")
                console.log(image)
                setLoading(false)
            }
        }

        fetchImage()
    }, [fileName])

    return {
        loading,
        error,
        image,
    }
}

export default useImage