'use client';

import { Button, Image, List, Slider, Spin, Upload, UploadFile } from 'antd';
import { CARBON_UNIT } from 'app/_config/constants';
import { AssetGroupDto } from 'app/dto/AssetGroupDto';
import { useCallback, useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';

type UploaderProps = {
    group?: AssetGroupDto
};

const UploaderListItem = (props: { file: UploadFile }) => {
    const { file } = props;

    if (file.status === 'uploading') {
        return (
            <Spin spinning={true}>
                <List.Item className="animate-pulse">
                    <List.Item.Meta
                        avatar={
                            <img
                                src={URL.createObjectURL(file.originFileObj)}
                                alt=""
                                style={{ height: '50px' }}
                            />
                        }
                        title={file.name}
                        description={`optimizing...`}
                    />
                </List.Item>
            </Spin>
        );
    }

    if (file.status === 'error') {
        return (
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
                    description={
                        <span className="text-red-500">Error: {file.error}</span>
                    }
                />
            </List.Item>
        );
    }

    if (file.status === 'done') {
        return (
            <List.Item
                actions={[
                    <div key='download-size' className='flex gap-2'>
                        <span className='line-through'>{file.response.originalFile.smartSize.value}  {file.response.originalFile.smartSize.unit}</span>
                        <span>{file.response.optimizedFile.smartSize.value}  {file.response.optimizedFile.smartSize.unit}</span>
                    </div>,
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
                    title={file.response.optimizedFile.fullName}
                    description={`
                You saved ${file.response.optimizationPercent}% (${file.response.smartReduction.value} ${file.response.smartReduction.unit}) (${file.response.reductionInCarbon} ${CARBON_UNIT})
            `}
                />
            </List.Item>
        );
    }

    return null;
};

export const Uploader = (props: UploaderProps) => {
    const { group } = props;
    const [assetGroup, setAssetGroup] = useState<AssetGroupDto | undefined>(group);
    const [quality, setQuality] = useState(75);
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
        const uploadingCount = files.filter((file) => file.status === 'uploading');
        if (uploadingCount.length > 0) {
            setIsAnyFileUploading(true);
        } else {
            setIsAnyFileUploading(false);
        }
    }, [files]);

    const refreshAssetGroup = useCallback(async (group: AssetGroupDto) => {
        const response = await fetch(`/api/group/${group.id}`);
        const json = await response.json();
        setAssetGroup(json);
    }, [setAssetGroup]);

    const addGroupIdToCurrentUrl = useCallback((groupId: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('g', groupId);
        window.history.pushState({}, '', url.toString());
    }, []);

    const isPossibleToDownloadAll = useCallback(() => {
        return isAnyFileUploading === false && assetGroup && assetGroup.assets.length > 0;
    }, [isAnyFileUploading, assetGroup]);

    const uploaderHandleOnChange = useCallback((info: UploadChangeParam) => {
        setFiles([
            // ...files,
            ...(group ? group.assets.map((asset) => {
                return {
                    uid: asset.id,
                    name: asset.optimizedFile.name,
                    status: 'done',
                    response: asset
                } as UploadFile;
            }) : []),
            ...info.fileList
        ]);
        const { status } = info.file;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            if (assetGroup) {
                refreshAssetGroup(assetGroup);
            }
        } else if (status === 'error') {
        }
    }, [assetGroup, group, refreshAssetGroup]);

    const uploaderCustomRequest = useCallback(async (options) => {
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

        const form = new FormData();
        form.append('file', options.file);
        // @ts-ignore it exists.. 😭
        form.append('fileName', options.file.name ? options.file.name : 'file');
        form.append('groupId', g.id);
        form.append('q', quality.toString());
        try {
            const response = await fetch('/api/image/optimize', {
                method: 'POST',
                body: form
            });
            const json = await response.json();
            if (response.status !== 200) {
                return options.onError(json.error);
            }
            options.onSuccess(json);
        } catch (e) {
            options.onError(e.message);
        }
    }, [assetGroup, quality, addGroupIdToCurrentUrl]);

    return (
        <div className='bg-white p-5 rounded-xl space-y-5 shadow'>
            <Upload.Dragger
                name="file"
                multiple={true}
                showUploadList={false}
                action="/api/image/optimize"
                customRequest={async (options) => uploaderCustomRequest(options)}
                accept=".png,.jpg,.jpeg"
                onChange={(info) => uploaderHandleOnChange(info)}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Drag & drop your files here or click to select. You can upload multiple files at once.
                </p>
                <p className="ant-upload-hint">
                    Images will be converted to webp format and optimized. Only .png, .jpg, .jpeg files are allowed.
                </p>
            </Upload.Dragger>
            <div className="space-y-2">
                <div className="flex flex-col justify-center items-center text-gray-600">quality - the less the better saving ({quality}%)</div>
                <Slider
                    value={quality}
                    onChange={(value) => setQuality(value)}
                />
            </div>
            {files.length > 0 && (
                <div className="space-y-4">
                    <List
                        className="border-t border-b"
                        itemLayout="horizontal"
                        dataSource={files}
                        renderItem={(file) => (<UploaderListItem file={file} />)}
                    />
                    <div className="flex items-center">
                        {
                            assetGroup && (
                                <div className='text-gray-400 text-sm grow'>
                                    🌲 Total reduction: {assetGroup.smartReduction.value} {assetGroup.smartReduction.unit} ({assetGroup.reductionInCarbon} {CARBON_UNIT})
                                </div>
                            )
                        }
                        {isPossibleToDownloadAll() && (
                            <div className="flex justify-end gap-2">
                                <Button
                                    onClick={async () => {
                                        const url = window.location.href;
                                        await navigator.clipboard.writeText(url);
                                    }}
                                >copy link</Button>
                                <a href={`api/group/${assetGroup.id}/download`}>
                                    <Button type="primary">Download All ({assetGroup.smartSize.value} {assetGroup.smartSize.unit})</Button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
