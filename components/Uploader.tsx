'use client';

import { Button, Form, Upload } from 'antd';
import { uploadImageAndOptimize } from 'app/actions/uploadAndOptimizeImage';
import { useRouter } from 'next/navigation';

export const Uploader = () => {
    const router = useRouter();
    return (
        <Form onFinish={(values) => {}}>
            <Form.Item>
                <Upload.Dragger
                    name="file"
                    multiple={true}
                    action="/api/image/optimize"
                    accept=".png,.jpg,.jpeg"
                    onChange={(info) => {
                        // upload(info.file.originFileObj);
                        const { status } = info.file;
                        if (status !== 'uploading') {
                            console.log(info.file, info.fileList);
                        }
                        if (status === 'done') {
                            router.refresh();
                            // message.success(`${info.file.name} file uploaded successfully.`);
                        } else if (status === 'error') {
                            // message.error(`${info.file.name} file upload failed.`);
                        }
                    }}
                    onDrop={(e) => {
                        console.log('Dropped files', e.dataTransfer.files);
                    }}
                >
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Upload.Dragger>
            </Form.Item>
        </Form>
    );

    return (
        <form action={uploadImageAndOptimize}>
            <input
                type="file"
                name="file"
                accept="
                image/png,
                image/jpeg,
            "
            />
            <button type="submit">Upload</button>
        </form>
    );
};
