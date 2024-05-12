'use client';

import { Button, Form, Image, List, Spin, Upload, UploadFile } from 'antd';
import { uploadImageAndOptimize } from 'app/actions/uploadAndOptimizeImage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Uploader = () => {
    const [groupId, setGroupId] = useState<string | null>(null);
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [isAnyFileUploading, setIsAnyFileUploading] = useState(false);

    useEffect(() => {
        if (files.some((file) => file.status === 'uploading')) {
            setIsAnyFileUploading(true);
        } else {
            setIsAnyFileUploading(false);
        }
    }, [files]);

    const getSummary = () => {
        const totalReductionInKb = files.reduce((acc, file) => {
            if (file.status === 'done') {
                return acc + file.response.reductionInKb;
            }
            return acc;
        }, 0);

        const totalReductionInCarbon = files.reduce((acc, file) => {
            if (file.status === 'done') {
                return acc + file.response.reductionInCarbon;
            }
            return acc;
        }, 0);

        return {
            totalReductionInKb,
            totalReductionInCarbon
        };
    }

    const isPossibleToDownloadAll = () => {
        return isAnyFileUploading === false;
    };

    const router = useRouter();
    return (
        <div className='bg-white p-5 rounded-xl space-y-5'>
            <Upload.Dragger
                name="file"
                multiple={true}
                showUploadList={false}
                action="/api/image/optimize"
                customRequest={async (options) => {
                    const form = new FormData();
                    form.append('file', options.file);
                    const response = await fetch('/api/image/optimize', {
                        method: 'POST',
                        body: form
                    });
                    const json = await response.json();
                    options.onSuccess(json);
                }}
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
                        className="border-t border-b"
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
                                                <Image
                                                    src={`api/image/${file.response.optimizedFile.key}`}
                                                    alt=""
                                                    width={50}
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

                            return null;
                        }}
                    />
                    <div className="flex items-center">
                        <div className='text-gray-400 text-sm grow'>
                            🌲 Total reduction: {getSummary().totalReductionInKb} kB ({getSummary().totalReductionInCarbon} co2)
                        </div>
                        {isPossibleToDownloadAll() && (
                            <div className="flex justify-end">
                                <Button type="primary">Download All</Button>
                            </div>
                        )}
                    </div>
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
