'use client';

import { Button, Form, Image, List, Spin, Upload, UploadFile } from 'antd';
import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type UploaderProps = {
    group?: AssetGroupDto
};

export const Uploader = (props: UploaderProps) => {
    const { group } = props;
    const [assetGroup, setAssetGroup] = useState<AssetGroupDto | undefined>(group);
    const [files, setFiles] = useState<UploadFile[]>([]);
    const [isAnyFileUploading, setIsAnyFileUploading] = useState(false);

    useEffect(() => {
        if (group) {
            setFiles(group.assets.map((asset) => ({
                uid: asset.id,
                name: asset.optimizedFile.name,
                status: 'done',
                response: asset
            })));
        }
    }, [setFiles, group]);

    useEffect(() => {
        if (files.some((file) => file.status === 'uploading')) {
            setIsAnyFileUploading(true);
        } else {
            setIsAnyFileUploading(false);
        }
    }, [files]);

    const refreshAssetGroup = async (group: AssetGroupDto) => {
        const response = await fetch(`/api/group/${group.id}`);
        const json = await response.json();
        setAssetGroup(json);
    }

    const addGroupIdToCurrentUrl = (groupId: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('g', groupId);
        window.history.pushState({}, '', url.toString());
    }

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
                    let g: AssetGroupDto | null = assetGroup;
                    if (!g) {
                        const response = await fetch('/api/group', {
                            method: 'POST',
                            body: JSON.stringify({}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        const json = await response.json();
                        g = json;
                        setAssetGroup(json);
                        addGroupIdToCurrentUrl(g.id);
                    }

                    console.log(options);

                    const form = new FormData();
                    form.append('file', options.file);
                    // @ts-ignore it exists.. 😭
                    form.append('fileName', options.file.name ? options.file.name : 'file');
                    form.append('groupId', g.id);
                    const response = await fetch('/api/image/optimize', {
                        method: 'POST',
                        body: form
                    });
                    const json = await response.json();
                    options.onSuccess(json);
                }}
                accept=".png,.jpg,.jpeg"
                onChange={(info) => {
                    setFiles([
                        ...(assetGroup ? assetGroup.assets.map((asset) => ({
                            uid: asset.id,
                            name: asset.optimizedFile.name,
                            status: 'done',
                            response: asset
                        })) as UploadFile<any>[] : []),
                        ...info.fileList
                    ]);
                    const { status } = info.file;
                    if (status !== 'uploading') {
                        console.log(info.file, info.fileList);
                        // setFiles(info.fileList);
                    }
                    if (status === 'done') {
                        if (assetGroup) {
                            refreshAssetGroup(assetGroup);
                        }
                        // router.refresh();
                        // message.success(`${info.file.name} file uploaded successfully.`);
                    } else if (status === 'error') {
                        // message.error(`${info.file.name} file upload failed.`);
                    }
                }}
                onDrop={(e) => {
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
                        {
                            assetGroup && (
                                <div className='text-gray-400 text-sm grow'>
                                    🌲 Total reduction: {assetGroup.reductionInKb} kB ({assetGroup.reductionInCarbon} co2)
                                </div>
                            )
                        }
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
};
