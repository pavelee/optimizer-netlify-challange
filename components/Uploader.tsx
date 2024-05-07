'use client'

import { uploadImageAndOptimize } from "app/actions/uploadAndOptimizeImage"

export const Uploader = () => {
    return (
        <form action={uploadImageAndOptimize}>
            <input type="file" name="file" />
            <button type="submit">Upload</button>
        </form>
    )
}