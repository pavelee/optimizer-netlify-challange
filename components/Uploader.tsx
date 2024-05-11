'use client';

import { Button, Form, List, Spin, Upload, UploadFile } from 'antd';
import { uploadImageAndOptimize } from 'app/actions/uploadAndOptimizeImage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Uploader = () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [isAnyFileUploading, setIsAnyFileUploading] = useState(false);

    useEffect(() => {
        if (files.some((file) => file.status === 'uploading')) {
            setIsAnyFileUploading(true);
        } else {
            setIsAnyFileUploading(false);
        }
    }, [files]);

    const isPossibleToDownloadAll = () => {
        return isAnyFileUploading === false;
    };

    const router = useRouter();
    return (
        <div>
            <Upload.Dragger
                name="file"
                multiple={true}
                showUploadList={false}
                action="/api/image/optimize"
                accept=".png,.jpg,.jpeg"
                onChange={(info) => {
                    // upload(info.file.originFileObj);
                    setFiles(info.fileList);
                    const { status } = info.file;
                    if (status !== 'uploading') {
                        console.log(info.file, info.fileList);
                        // setFiles(info.fileList);
                    }
                    if (status === 'done') {
                        // router.refresh();
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
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
                    files.
                </p>
            </Upload.Dragger>
            {files.length > 0 && (
                <div className="space-y-4">
                    <List
                        className="border"
                        itemLayout="horizontal"
                        dataSource={files}
                        renderItem={(file) => {
                            if (file.status === 'uploading') {
                                return (
                                    <Spin spinning={true}>
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={
                                                    <img
                                                        src={URL.createObjectURL(file.originFileObj)}
                                                        alt=""
                                                        style={{ height: '50px' }}
                                                    />
                                                }
                                                title={file.name}
                                                description={`Uploading...`}
                                            />
                                        </List.Item>
                                    </Spin>
                                );
                            }

                            if (file.status === 'done') {
                                return (
                                    <List.Item
                                        actions={[
                                            <a
                                                key="list-download"
                                                href={`/api/image/${file.response.optimizedFile.key}/download`}
                                            >
                                                <Button>Download</Button>
                                            </a>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <img
                                                    src={URL.createObjectURL(file.originFileObj)}
                                                    alt=""
                                                    style={{ height: '50px' }}
                                                />
                                            }
                                            title={file.name}
                                            description={`
                                        You saved ${file.response.optimizationPercent}% (${file.response.reductionInKb} kB) (${file.response.reductionInCarbon} co2)
                                    `}
                                        />
                                    </List.Item>
                                );
                            }

                            return <div>asdsa</div>;
                        }}
                    />
                    {isAnyFileUploading === false && (
                        <div className="w-full flex justify-end">
                            <Button type="primary">Download All</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
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
