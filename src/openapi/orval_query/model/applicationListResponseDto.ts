/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * COMMERCE
 * COMMERCE REST API DOC
 * OpenAPI spec version: 1.0.0
 */
import type { LocalTime } from './localTime';
import type { MemberInfoDto } from './memberInfoDto';

export interface ApplicationListResponseDto {
  canceled?: boolean;
  content?: string;
  duration?: LocalTime;
  partnerAge?: number;
  partnerGender?: string;
  partnerInfoDto?: MemberInfoDto;
  place?: string;
  recruit_date?: string;
  routine?: string;
  status?: string;
  title?: string;
  writerInfoDto?: MemberInfoDto;
}
