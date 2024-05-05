'use client'

import { uploadImage } from "app/actions/uploadImage"

export const Uploader = () => {
    return (
        <form action={uploadImage}>
            <input type="file" name="file" />
            <button type="submit">Upload</button>
        </form>
    )
}