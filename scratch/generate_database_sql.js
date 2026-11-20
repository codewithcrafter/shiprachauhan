const fs = require('fs');

const seed = JSON.parse(fs.readFileSync('scratch/initial_articles_seed.json', 'utf8'));

function escapeSql(str) {
  if (str === null || str === undefined) return "''";
  return "'" + str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
}

let sql = `-- ==============================================================================
-- SHIPRA CHAUHAN WEB PLATFORM — DATABASE DUMP FOR XAMPP LOCALHOST
-- Database: shipra_chauhan_db
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS \`shipra_chauhan_db\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`shipra_chauhan_db\`;

-- -----------------------------------------------------------------------------
-- Table structure for \`blogs\`
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`blogs\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`category\` VARCHAR(100) NOT NULL DEFAULT 'SEO Strategy',
  \`tags\` VARCHAR(500) NULL DEFAULT '',
  \`featured_image\` VARCHAR(255) NULL DEFAULT '',
  \`featured_image_alt\` VARCHAR(255) NULL DEFAULT '',
  \`publish_stage\` ENUM('published', 'draft') NOT NULL DEFAULT 'published',
  \`publication_date\` DATE NOT NULL,
  \`read_time\` INT NOT NULL DEFAULT 5,
  \`author\` VARCHAR(100) NOT NULL DEFAULT 'Krishna Pal',
  \`verified_by\` VARCHAR(100) NOT NULL DEFAULT 'Shipra Chauhan',
  \`seo_title\` VARCHAR(255) NULL DEFAULT '',
  \`short_excerpt\` TEXT NOT NULL,
  \`meta_description\` TEXT NULL,
  \`meta_keywords\` VARCHAR(500) NULL DEFAULT '',
  \`schema_type\` VARCHAR(50) NOT NULL DEFAULT 'automatic',
  \`custom_schema\` LONGTEXT NULL,
  \`body_markdown\` LONGTEXT NULL,
  \`body_content\` LONGTEXT NOT NULL,
  \`faqs_json\` LONGTEXT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_slug\` (\`slug\`),
  INDEX \`idx_publish_date\` (\`publish_stage\`, \`publication_date\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Seed Initial 10 Technical Blog Articles
-- -----------------------------------------------------------------------------
`;

seed.forEach(a => {
  sql += `INSERT INTO \`blogs\` (
  \`title\`, \`slug\`, \`category\`, \`tags\`, \`featured_image\`, \`featured_image_alt\`,
  \`publish_stage\`, \`publication_date\`, \`read_time\`, \`author\`, \`verified_by\`,
  \`seo_title\`, \`short_excerpt\`, \`meta_description\`, \`meta_keywords\`,
  \`schema_type\`, \`custom_schema\`, \`body_markdown\`, \`body_content\`, \`faqs_json\`
) VALUES (
  ${escapeSql(a.title)},
  ${escapeSql(a.slug)},
  ${escapeSql(a.category)},
  ${escapeSql(a.tags)},
  ${escapeSql(a.featured_image)},
  ${escapeSql(a.featured_image_alt)},
  ${escapeSql(a.publish_stage)},
  ${escapeSql(a.publication_date)},
  ${a.read_time},
  ${escapeSql(a.author)},
  'Shipra Chauhan',
  ${escapeSql(a.seo_title)},
  ${escapeSql(a.short_excerpt)},
  ${escapeSql(a.meta_description)},
  ${escapeSql(a.meta_keywords)},
  'automatic',
  '',
  ${escapeSql(a.body_markdown)},
  ${escapeSql(a.body_content)},
  '[]'
) ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`);\n\n`;
});

fs.writeFileSync('database.sql', sql, 'utf8');
console.log('Successfully generated database.sql with schema and all 10 seed articles!');

