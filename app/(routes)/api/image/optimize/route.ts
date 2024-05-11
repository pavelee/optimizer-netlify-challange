import { uploadImageAndOptimize } from 'app/actions/uploadAndOptimizeImage';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
    const blob = await request.formData();

    await uploadImageAndOptimize(blob);

    return NextResponse.json({});
};
