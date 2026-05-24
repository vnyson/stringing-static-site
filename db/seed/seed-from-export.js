const fs = require('fs');
const path = require('path');

// Read the export data
const exportData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../racquet-tracker-export-2026-05-22.json'), 'utf-8')
);

// Generate SQL INSERT statements
let sqlStatements = [];

// Seed players
exportData.players.forEach(player => {
  const values = [
    `'${player.id}'`,
    player.user_id ? `'${player.user_id}'` : 'NULL',
    `'${player.name.replace(/'/g, "''")}'`,
    player.club ? `'${player.club.replace(/'/g, "''")}'` : 'NULL',
    player.level ? `'${player.level.replace(/'/g, "''")}'` : 'NULL',
    player.style ? `'${player.style.replace(/'/g, "''")}'` : 'NULL',
    player.grip ? `'${player.grip.replace(/'/g, "''")}'` : 'NULL',
    player.string_pref ? `'${player.string_pref.replace(/'/g, "''")}'` : 'NULL',
    player.tension ? `'${player.tension.replace(/'/g, "''")}'` : 'NULL',
    player.racquet ? `'${player.racquet.replace(/'/g, "''")}'` : 'NULL',
    player.notes ? `'${player.notes.replace(/'/g, "''")}'` : 'NULL',
    player.email ? `'${player.email.replace(/'/g, "''")}'` : 'NULL',
    player.phone ? `'${player.phone.replace(/'/g, "''")}'` : 'NULL',
    player.restring_interval_weeks ? player.restring_interval_weeks : 'NULL',
    `'${player.created_at}'`,
    `'${player.updated_at}'`
  ].join(', ');
  
  sqlStatements.push(`INSERT OR REPLACE INTO players (id, user_id, name, club, level, style, grip, string_pref, tension, racquet, notes, email, phone, restring_interval_weeks, created_at, updated_at) VALUES (${values});`);
});

// Seed stringing jobs
exportData.stringing.forEach(job => {
  const values = [
    `'${job.id}'`,
    `'${job.player_id}'`,
    job.racquet ? `'${job.racquet.replace(/'/g, "''")}'` : 'NULL',
    job.string_mains ? `'${job.string_mains.replace(/'/g, "''")}'` : 'NULL',
    job.string_crosses ? `'${job.string_crosses.replace(/'/g, "''")}'` : 'NULL',
    job.gauge_mains ? `'${job.gauge_mains}'` : 'NULL',
    job.gauge_crosses ? `'${job.gauge_crosses}'` : 'NULL',
    job.tension_mains ? `'${job.tension_mains}'` : 'NULL',
    job.tension_crosses ? `'${job.tension_crosses}'` : 'NULL',
    job.tension_unit ? `'${job.tension_unit}'` : 'NULL',
    job.tension_unit_crosses ? `'${job.tension_unit_crosses}'` : 'NULL',
    job.prestretch ? `'${job.prestretch}'` : 'NULL',
    job.prestretch_crosses ? `'${job.prestretch_crosses}'` : 'NULL',
    `'${job.strung_at}'`,
    job.notes ? `'${job.notes.replace(/'/g, "''")}'` : 'NULL',
    `'${job.status}'`,
    `'${job.priority}'`,
    `'${job.created_at}'`,
    job.player_own_string ? job.player_own_string : '0',
    job.labour_cost ? job.labour_cost : 'NULL',
    job.material_cost ? job.material_cost : 'NULL',
    job.charge_total ? job.charge_total : 'NULL',
    `'${job.string_tier}'`,
    job.service_label ? `'${job.service_label.replace(/'/g, "''")}'` : 'NULL',
    job.regrip ? job.regrip : '0',
    job.logo_color ? `'${job.logo_color.replace(/'/g, "''")}'` : 'NULL',
    job.pickup_time ? `'${job.pickup_time}'` : 'NULL',
    job.picked_up_at ? `'${job.picked_up_at}'` : 'NULL',
    job.stringer_name ? `'${job.stringer_name.replace(/'/g, "''")}'` : 'NULL',
    job.knots ? job.knots : 'NULL',
    `'${job.player_name.replace(/'/g, "''")}'`
  ].join(', ');
  
  sqlStatements.push(`INSERT OR REPLACE INTO stringing (id, player_id, racquet, string_mains, string_crosses, gauge_mains, gauge_crosses, tension_mains, tension_crosses, tension_unit, tension_unit_crosses, prestretch, prestretch_crosses, strung_at, notes, status, priority, created_at, player_own_string, labour_cost, material_cost, charge_total, string_tier, service_label, regrip, logo_color, pickup_time, picked_up_at, stringer_name, knots, player_name) VALUES (${values});`);
});

// Seed history
exportData.history.forEach(entry => {
  const values = [
    `'${entry.id}'`,
    `'${entry.player_id}'`,
    entry.racquet ? `'${entry.racquet.replace(/'/g, "''")}'` : 'NULL',
    entry.notes ? `'${entry.notes.replace(/'/g, "''")}'` : 'NULL',
    entry.current_weight ? entry.current_weight : 'NULL',
    entry.target_weight ? entry.target_weight : 'NULL',
    entry.current_balance ? entry.current_balance : 'NULL',
    entry.target_balance ? entry.target_balance : 'NULL',
    entry.mass_added ? entry.mass_added : 'NULL',
    entry.mass_location ? entry.mass_location : 'NULL',
    entry.sw_delta ? entry.sw_delta : 'NULL',
    entry.sw_result ? entry.sw_result : 'NULL',
    `'${entry.created_at}'`,
    entry.price_currency ? `'${entry.price_currency}'` : 'NULL',
    entry.price_overgrip ? entry.price_overgrip : 'NULL',
    entry.price_specs_measurement ? entry.price_specs_measurement : 'NULL',
    entry.price_specs_matching ? entry.price_specs_matching : 'NULL',
    entry.price_grip_replacement ? entry.price_grip_replacement : 'NULL',
    entry.price_bumper_grommet ? entry.price_bumper_grommet : 'NULL',
    entry.price_other ? entry.price_other : 'NULL',
    entry.price_other_label ? `'${entry.price_other_label.replace(/'/g, "''")}'` : 'NULL',
    entry.price_total ? entry.price_total : 'NULL',
    `'${entry.player_name.replace(/'/g, "''")}'`
  ].join(', ');
  
  sqlStatements.push(`INSERT OR REPLACE INTO history (id, player_id, racquet, notes, current_weight, target_weight, current_balance, target_balance, mass_added, mass_location, sw_delta, sw_result, created_at, price_currency, price_overgrip, price_specs_measurement, price_specs_matching, price_grip_replacement, price_bumper_grommet, price_other, price_other_label, price_total, player_name) VALUES (${values});`);
});

// Write SQL to file
const sqlContent = sqlStatements.join('\n');
fs.writeFileSync(path.join(__dirname, 'seed-from-export.sql'), sqlContent);

console.log(`Generated ${sqlStatements.length} SQL statements`);
console.log(`Players: ${exportData.players.length}`);
console.log(`Stringing jobs: ${exportData.stringing.length}`);
console.log(`History entries: ${exportData.history.length}`);
console.log('SQL written to seed-from-export.sql');
