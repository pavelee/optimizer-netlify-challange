'use client'

import { uploadImageAndOptimize } from "app/actions/uploadAndOptimizeImage"

export const Uploader = () => {
    return (
        <form action={uploadImageAndOptimize}>
            <input type="file" name="file" accept="
                image/png,
                image/jpeg,
            " />
            <button type="submit">Upload</button>
        </form>
    )
}