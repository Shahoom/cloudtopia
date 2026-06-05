import * as migration_20260521_010356_initial_payload_schema from './20260521_010356_initial_payload_schema';
import * as migration_20260521_011700_add_pages_and_site_design from './20260521_011700_add_pages_and_site_design';
import * as migration_20260521_160000_structured_pages from './20260521_160000_structured_pages';
import * as migration_20260521_170000_structured_site_design from './20260521_170000_structured_site_design';
import * as migration_20260522_002700_fix_site_design_navigation_labels from './20260522_002700_fix_site_design_navigation_labels';
import * as migration_20260522_020000_project_media_relation from './20260522_020000_project_media_relation';
import * as migration_20260522_030000_fix_payload_locked_document_rels from './20260522_030000_fix_payload_locked_document_rels';
import * as migration_20260524_090000_add_blog_insights from './20260524_090000_add_blog_insights';
import * as migration_20260524_120000_upgrade_blog_platform from './20260524_120000_upgrade_blog_platform';
import * as migration_20260605_150500_add_crm_ai_leads from './20260605_150500_add_crm_ai_leads';

export const migrations = [
  {
    up: migration_20260521_010356_initial_payload_schema.up,
    down: migration_20260521_010356_initial_payload_schema.down,
    name: '20260521_010356_initial_payload_schema'
  },
  {
    up: migration_20260521_011700_add_pages_and_site_design.up,
    down: migration_20260521_011700_add_pages_and_site_design.down,
    name: '20260521_011700_add_pages_and_site_design'
  },
  {
    up: migration_20260521_160000_structured_pages.up,
    down: migration_20260521_160000_structured_pages.down,
    name: '20260521_160000_structured_pages'
  },
  {
    up: migration_20260521_170000_structured_site_design.up,
    down: migration_20260521_170000_structured_site_design.down,
    name: '20260521_170000_structured_site_design'
  },
  {
    up: migration_20260522_002700_fix_site_design_navigation_labels.up,
    down: migration_20260522_002700_fix_site_design_navigation_labels.down,
    name: '20260522_002700_fix_site_design_navigation_labels'
  },
  {
    up: migration_20260522_020000_project_media_relation.up,
    down: migration_20260522_020000_project_media_relation.down,
    name: '20260522_020000_project_media_relation'
  },
  {
    up: migration_20260522_030000_fix_payload_locked_document_rels.up,
    down: migration_20260522_030000_fix_payload_locked_document_rels.down,
    name: '20260522_030000_fix_payload_locked_document_rels'
  },
  {
    up: migration_20260524_090000_add_blog_insights.up,
    down: migration_20260524_090000_add_blog_insights.down,
    name: '20260524_090000_add_blog_insights'
  },
  {
    up: migration_20260524_120000_upgrade_blog_platform.up,
    down: migration_20260524_120000_upgrade_blog_platform.down,
    name: '20260524_120000_upgrade_blog_platform'
  },
  {
    up: migration_20260605_150500_add_crm_ai_leads.up,
    down: migration_20260605_150500_add_crm_ai_leads.down,
    name: '20260605_150500_add_crm_ai_leads'
  },
];
