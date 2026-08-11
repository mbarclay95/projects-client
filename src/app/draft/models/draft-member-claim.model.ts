import { DraftMember } from './draft-member.model';

/**
 * The response to `POST draft-members` — the only place `secret` is ever
 * returned, by any endpoint, in either repo. Kept separate from `DraftMember`
 * so nothing else on the public side can accidentally carry a secret.
 */
export interface DraftMemberClaim extends DraftMember {
  secret: string;
}
