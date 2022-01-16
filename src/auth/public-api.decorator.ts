import { SetMetadata } from '@nestjs/common';

/**
 * グローバルガードを無効化するためのカスタムデコレータ
 * 以下を適当なところで記述し、カスタムデコレータを作成
 */

export const PUBLIC_API_KEY = 'public-api';
export const PublicApi = () => SetMetadata(PUBLIC_API_KEY, true);
