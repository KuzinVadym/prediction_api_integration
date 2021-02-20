import { IServices } from './shared/interfaces/IServices';
import { createRepliesHttpService } from './replies/services/http';

export function createHttpServices(): IServices {
  return {
    replies: createRepliesHttpService()
  };
}
