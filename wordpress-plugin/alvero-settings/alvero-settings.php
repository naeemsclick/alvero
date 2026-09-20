<?php
/**
 * Plugin Name: Alvero Site Settings
 * Plugin URI: https://alvero.com.bd
 * Description: Native site settings management (Logo, Contact, Social, Footer, Header, Navigation) for Alvero Hair Solutions headless Next.js frontend.
 * Version: 2.0.0
 * Author: Alvero Team
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Alvero_Site_Settings {

    private $option_key = 'alvero_site_settings';

    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_media_uploader'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
    }

    public function add_admin_menu() {
        add_menu_page(
            'Alvero Settings',
            'Alvero Settings',
            'manage_options',
            'alvero-settings',
            array($this, 'render_admin_page'),
            'dashicons-admin-generic',
            30
        );
    }

    public function register_settings() {
        register_setting('alvero_settings_group', $this->option_key, array(
            'type' => 'array',
            'sanitize_callback' => array($this, 'sanitize_settings'),
            'default' => $this->get_default_settings()
        ));
    }

    public function enqueue_media_uploader($hook) {
        if (strpos($hook, 'alvero-settings') !== false) {
            wp_enqueue_media();
        }
    }

    public function get_default_announcements() {
        return array(
            array('id' => '1', 'text_en' => '🚚 Free Delivery On Complete Packages!', 'text_bn' => '🚚 সম্পূর্ণ প্যাকেজে ফ্রি ডেলিভারি!', 'enabled' => true),
            array('id' => '2', 'text_en' => '🌿 Nature-inspired care for stronger, healthier hair', 'text_bn' => '🌿 শক্ত ও স্বাস্থ্যকর চুলের জন্য প্রকৃতি-অনুপ্রাণিত যত্ন', 'enabled' => true),
            array('id' => '3', 'text_en' => '💚 Cash on Delivery available across Bangladesh', 'text_bn' => '💚 বাংলাদেশজুড়ে ক্যাশ অন ডেলিভারি', 'enabled' => true),
        );
    }

    public function get_default_main_menu() {
        return array(
            array(
                'id' => 'haircare',
                'label_en' => 'Haircare',
                'label_bn' => 'চুলের যত্ন',
                'href' => '/category/haircare',
                'enabled' => true,
                'accent' => false,
                'children' => array(
                    array('id' => 'hair-oil', 'label_en' => 'Hair Oil', 'label_bn' => 'হেয়ার অয়েল', 'href' => '/category/hair-oil', 'enabled' => true, 'accent' => false),
                    array('id' => 'hair-toner', 'label_en' => 'Hair Toner', 'label_bn' => 'হেয়ার টোনার', 'href' => '/category/hair-toner', 'enabled' => true, 'accent' => false),
                    array('id' => 'shampoo', 'label_en' => 'Shampoo', 'label_bn' => 'শ্যাম্পু', 'href' => '/category/shampoo', 'enabled' => true, 'accent' => false),
                    array('id' => 'packages', 'label_en' => 'Packages', 'label_bn' => 'প্যাকেজ', 'href' => '/category/packages', 'enabled' => true, 'accent' => false),
                    array('id' => 'all-haircare', 'label_en' => 'All Haircare', 'label_bn' => 'সব হেয়ার কেয়ার', 'href' => '/category/haircare', 'enabled' => true, 'accent' => false),
                )
            ),
            array(
                'id' => 'care-guide',
                'label_en' => 'Care Guide',
                'label_bn' => 'কেয়ার গাইড',
                'href' => '/guide',
                'enabled' => true,
                'accent' => false,
                'children' => array(
                    array('id' => 'hair-fall', 'label_en' => 'Hair Fall', 'label_bn' => 'চুল পড়া', 'href' => '/guide/hair-fall-care', 'enabled' => true, 'accent' => false),
                    array('id' => 'dry-hair', 'label_en' => 'Dry Hair Routine', 'label_bn' => 'শুষ্ক চুল', 'href' => '/guide/dry-hair-routine', 'enabled' => true, 'accent' => false),
                    array('id' => 'scalp-care', 'label_en' => 'Scalp Care Basics', 'label_bn' => 'স্ক্যাল্প কেয়ার', 'href' => '/guide/scalp-care-basics', 'enabled' => true, 'accent' => false),
                    array('id' => 'find-care-guide', 'label_en' => 'Find Your Care', 'label_bn' => 'আপনার যত্ন বেছে নিন', 'href' => '/guide', 'enabled' => true, 'accent' => false),
                )
            ),
            array(
                'id' => 'standalone-hair-oil',
                'label_en' => 'Hair Oils',
                'label_bn' => 'হেয়ার অয়েল',
                'href' => '/category/hair-oil',
                'enabled' => true,
                'accent' => false,
                'children' => array()
            ),
            array(
                'id' => 'standalone-packages',
                'label_en' => 'Packages',
                'label_bn' => 'প্যাকেজ',
                'href' => '/category/packages',
                'enabled' => true,
                'accent' => false,
                'children' => array()
            ),
            array(
                'id' => 'track',
                'label_en' => 'Track My Order',
                'label_bn' => 'অর্ডার ট্র্যাক করুন',
                'href' => '/track',
                'enabled' => true,
                'accent' => false,
                'children' => array()
            ),
            array(
                'id' => 'refer',
                'label_en' => 'Refer & Win',
                'label_bn' => 'রেফার & জিতুন',
                'href' => '/refer-win',
                'enabled' => true,
                'accent' => true,
                'children' => array()
            ),
            array(
                'id' => 'find-care-concerns',
                'label_en' => 'Find Your Care',
                'label_bn' => 'আপনার যত্ন বেছে নিন',
                'href' => '/#concerns',
                'enabled' => true,
                'accent' => true,
                'children' => array()
            ),
        );
    }

    public function get_default_settings() {
        return array(
            'brand_name' => 'ALVERO',
            'descriptor' => 'HAIR SOLUTIONS',
            'logo_id' => '',
            'phone' => '+88 01811899068',
            'whatsapp_url' => 'https://wa.me/8801811899068',
            'email' => 'alverohairsolutions@gmail.com',
            'address' => 'Dhaka, Bangladesh, 1212',
            'facebook_url' => 'https://www.facebook.com/AlveroHairSolutions',
            'instagram_url' => 'https://www.instagram.com/alverohairsolutions',
            'tiktok_url' => 'https://www.tiktok.com/@alverohairsolutions',
            'tagline_en' => 'We believe healthy hair begins with the right care.',
            'tagline_bn' => 'সঠিক যত্নে স্বাস্থ্যকর চুলের শুরু।',
            'description_en' => 'At Alvero Hair Solutions, we believe healthy hair begins with the right care. Our mission is to provide effective, high-quality hair solutions that restore confidence and enhance natural beauty.',
            'description_bn' => 'Alvero Hair Solutions-এ আমরা বিশ্বাস করি সঠিক যত্নেই স্বাস্থ্যকর চুলের শুরু। আত্মবিশ্বাস ফিরিয়ে আনতে ও প্রাকৃতিক সৌন্দর্য বাড়াতে আমাদের হেয়ার কেয়ার সমাধান তৈরি।',
            'copyright' => '© 2026 Alvero Hair Solutions. All rights reserved.',
            'announcements' => $this->get_default_announcements(),
            'main_menu' => $this->get_default_main_menu(),
        );
    }

    public function sanitize_settings($input) {
        if (!current_user_can('manage_options')) {
            return get_option($this->option_key);
        }

        $existing = get_option($this->option_key, $this->get_default_settings());
        $output = is_array($existing) ? $existing : $this->get_default_settings();

        // Phase 1 Settings Sanitization
        if (isset($input['brand_name'])) $output['brand_name'] = sanitize_text_field($input['brand_name']);
        if (isset($input['descriptor'])) $output['descriptor'] = sanitize_text_field($input['descriptor']);
        if (isset($input['logo_id'])) $output['logo_id'] = absint($input['logo_id']);
        if (isset($input['phone'])) $output['phone'] = sanitize_text_field($input['phone']);
        if (isset($input['whatsapp_url'])) $output['whatsapp_url'] = esc_url_raw($input['whatsapp_url']);
        if (isset($input['email'])) $output['email'] = sanitize_email($input['email']);
        if (isset($input['address'])) $output['address'] = sanitize_text_field($input['address']);
        if (isset($input['facebook_url'])) $output['facebook_url'] = esc_url_raw($input['facebook_url']);
        if (isset($input['instagram_url'])) $output['instagram_url'] = esc_url_raw($input['instagram_url']);
        if (isset($input['tiktok_url'])) $output['tiktok_url'] = esc_url_raw($input['tiktok_url']);
        if (isset($input['tagline_en'])) $output['tagline_en'] = sanitize_text_field($input['tagline_en']);
        if (isset($input['tagline_bn'])) $output['tagline_bn'] = sanitize_text_field($input['tagline_bn']);
        if (isset($input['description_en'])) $output['description_en'] = wp_kses_post($input['description_en']);
        if (isset($input['description_bn'])) $output['description_bn'] = wp_kses_post($input['description_bn']);
        if (isset($input['copyright'])) $output['copyright'] = sanitize_text_field($input['copyright']);

        // Phase 2 Announcements Sanitization
        if (isset($input['announcements']) && is_array($input['announcements'])) {
            $clean_announcements = array();
            foreach ($input['announcements'] as $index => $item) {
                if (empty($item['text_en']) && empty($item['text_bn'])) continue;
                $clean_announcements[] = array(
                    'id' => !empty($item['id']) ? sanitize_key($item['id']) : 'anc-' . ($index + 1),
                    'text_en' => sanitize_text_field($item['text_en']),
                    'text_bn' => sanitize_text_field($item['text_bn']),
                    'enabled' => !empty($item['enabled']),
                );
            }
            $output['announcements'] = $clean_announcements;
        }

        // Phase 2 Main Menu Sanitization
        if (isset($input['main_menu']) && is_array($input['main_menu'])) {
            $clean_menu = array();
            foreach ($input['main_menu'] as $index => $item) {
                if (empty($item['label_en']) && empty($item['label_bn'])) continue;

                $children = array();
                if (isset($item['children']) && is_array($item['children'])) {
                    foreach ($item['children'] as $c_index => $child) {
                        if (empty($child['label_en']) && empty($child['label_bn'])) continue;
                        $children[] = array(
                            'id' => !empty($child['id']) ? sanitize_key($child['id']) : 'sub-' . ($index + 1) . '-' . ($c_index + 1),
                            'label_en' => sanitize_text_field($child['label_en']),
                            'label_bn' => sanitize_text_field($child['label_bn']),
                            'href' => sanitize_text_field($child['href']),
                            'enabled' => !empty($child['enabled']),
                            'accent' => !empty($child['accent']),
                        );
                    }
                }

                $clean_menu[] = array(
                    'id' => !empty($item['id']) ? sanitize_key($item['id']) : 'item-' . ($index + 1),
                    'label_en' => sanitize_text_field($item['label_en']),
                    'label_bn' => sanitize_text_field($item['label_bn']),
                    'href' => sanitize_text_field($item['href']),
                    'enabled' => !empty($item['enabled']),
                    'accent' => !empty($item['accent']),
                    'children' => $children,
                );
            }
            $output['main_menu'] = $clean_menu;
        }

        return $output;
    }

    public function render_admin_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $active_tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'general';
        $options = wp_parse_args(get_option($this->option_key, array()), $this->get_default_settings());

        if (empty($options['announcements'])) $options['announcements'] = $this->get_default_announcements();
        if (empty($options['main_menu'])) $options['main_menu'] = $this->get_default_main_menu();

        $logo_url = $options['logo_id'] ? wp_get_attachment_image_url($options['logo_id'], 'medium') : '';
        ?>
        <div class="wrap">
            <h1>🌿 Alvero Store Settings</h1>
            <?php settings_errors(); ?>

            <h2 class="nav-tab-wrapper">
                <a href="?page=alvero-settings&tab=general" class="nav-tab <?php echo $active_tab === 'general' ? 'nav-tab-active' : ''; ?>">Basic Site Settings</a>
                <a href="?page=alvero-settings&tab=navigation" class="nav-tab <?php echo $active_tab === 'navigation' ? 'nav-tab-active' : ''; ?>">Header & Navigation</a>
            </h2>

            <form method="post" action="options.php">
                <?php settings_fields('alvero_settings_group'); ?>

                <?php if ($active_tab === 'general') : ?>
                    <!-- TAB 1: BASIC SITE SETTINGS -->
                    <h3>Basic Site Settings (Phase 1)</h3>
                    <table class="form-table" role="presentation">
                        <tr>
                            <th scope="row"><label for="brand_name">Brand Name</label></th>
                            <td><input type="text" id="brand_name" name="<?php echo $this->option_key; ?>[brand_name]" value="<?php echo esc_attr($options['brand_name']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="descriptor">Brand Descriptor</label></th>
                            <td><input type="text" id="descriptor" name="<?php echo $this->option_key; ?>[descriptor]" value="<?php echo esc_attr($options['descriptor']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label>Logo Image</label></th>
                            <td>
                                <input type="hidden" id="logo_id" name="<?php echo $this->option_key; ?>[logo_id]" value="<?php echo esc_attr($options['logo_id']); ?>" />
                                <div id="logo-preview-wrap" style="margin-bottom: 10px;">
                                    <?php if ($logo_url) : ?>
                                        <img id="logo-preview" src="<?php echo esc_url($logo_url); ?>" style="max-height: 80px; width: auto; display: block; border: 1px solid #ccc; padding: 5px; background: #fff;" />
                                    <?php else : ?>
                                        <img id="logo-preview" src="" style="max-height: 80px; width: auto; display: none; border: 1px solid #ccc; padding: 5px; background: #fff;" />
                                    <?php endif; ?>
                                </div>
                                <button type="button" class="button" id="upload-logo-btn">Select / Upload Logo</button>
                                <button type="button" class="button" id="remove-logo-btn" style="<?php echo $options['logo_id'] ? '' : 'display:none;'; ?>">Remove Logo</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="phone">Phone Number</label></th>
                            <td><input type="text" id="phone" name="<?php echo $this->option_key; ?>[phone]" value="<?php echo esc_attr($options['phone']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="whatsapp_url">WhatsApp Number / Link</label></th>
                            <td><input type="text" id="whatsapp_url" name="<?php echo $this->option_key; ?>[whatsapp_url]" value="<?php echo esc_attr($options['whatsapp_url']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="email">Customer Support Email</label></th>
                            <td><input type="email" id="email" name="<?php echo $this->option_key; ?>[email]" value="<?php echo esc_attr($options['email']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="address">Business Address</label></th>
                            <td><input type="text" id="address" name="<?php echo $this->option_key; ?>[address]" value="<?php echo esc_attr($options['address']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="facebook_url">Facebook URL</label></th>
                            <td><input type="url" id="facebook_url" name="<?php echo $this->option_key; ?>[facebook_url]" value="<?php echo esc_attr($options['facebook_url']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="instagram_url">Instagram URL</label></th>
                            <td><input type="url" id="instagram_url" name="<?php echo $this->option_key; ?>[instagram_url]" value="<?php echo esc_attr($options['instagram_url']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="tiktok_url">TikTok URL</label></th>
                            <td><input type="url" id="tiktok_url" name="<?php echo $this->option_key; ?>[tiktok_url]" value="<?php echo esc_attr($options['tiktok_url']); ?>" class="regular-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="tagline_en">Footer Tagline (English)</label></th>
                            <td><input type="text" id="tagline_en" name="<?php echo $this->option_key; ?>[tagline_en]" value="<?php echo esc_attr($options['tagline_en']); ?>" class="large-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="tagline_bn">Footer Tagline (Bangla)</label></th>
                            <td><input type="text" id="tagline_bn" name="<?php echo $this->option_key; ?>[tagline_bn]" value="<?php echo esc_attr($options['tagline_bn']); ?>" class="large-text" /></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="description_en">Footer Description (English)</label></th>
                            <td><textarea id="description_en" name="<?php echo $this->option_key; ?>[description_en]" rows="3" class="large-text"><?php echo esc_textarea($options['description_en']); ?></textarea></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="description_bn">Footer Description (Bangla)</label></th>
                            <td><textarea id="description_bn" name="<?php echo $this->option_key; ?>[description_bn]" rows="3" class="large-text"><?php echo esc_textarea($options['description_bn']); ?></textarea></td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="copyright">Copyright Text</label></th>
                            <td><input type="text" id="copyright" name="<?php echo $this->option_key; ?>[copyright]" value="<?php echo esc_attr($options['copyright']); ?>" class="large-text" /></td>
                        </tr>
                    </table>

                <?php else : ?>
                    <!-- TAB 2: HEADER & NAVIGATION -->
                    <h3>Header & Navigation (Phase 2)</h3>

                    <h4 style="margin-top:20px; font-size:16px;">Section A — Announcement Bar Items</h4>
                    <p class="description">Manage announcement ticker items shown at the top of the page.</p>
                    <table class="widefat fixed striped" id="announcements-table" style="margin-bottom:15px;">
                        <thead>
                            <tr>
                                <th style="width:70px;">Enabled</th>
                                <th>English Text</th>
                                <th>Bangla Text</th>
                                <th style="width:70px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($options['announcements'] as $idx => $anc) : ?>
                                <tr>
                                    <td>
                                        <input type="hidden" name="<?php echo $this->option_key; ?>[announcements][<?php echo $idx; ?>][id]" value="<?php echo esc_attr($anc['id']); ?>" />
                                        <input type="checkbox" name="<?php echo $this->option_key; ?>[announcements][<?php echo $idx; ?>][enabled]" value="1" <?php checked(!empty($anc['enabled'])); ?> />
                                    </td>
                                    <td><input type="text" name="<?php echo $this->option_key; ?>[announcements][<?php echo $idx; ?>][text_en]" value="<?php echo esc_attr($anc['text_en']); ?>" class="large-text" /></td>
                                    <td><input type="text" name="<?php echo $this->option_key; ?>[announcements][<?php echo $idx; ?>][text_bn]" value="<?php echo esc_attr($anc['text_bn']); ?>" class="large-text" /></td>
                                    <td><button type="button" class="button remove-row-btn">Remove</button></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                    <button type="button" class="button button-secondary" id="add-announcement-btn">+ Add Announcement Item</button>

                    <hr style="margin: 30px 0 20px 0;" />

                    <h4 style="font-size:16px;">Section B — Main Navigation Menu</h4>
                    <p class="description">Manage main header & mobile drawer navigation items. Supports dropdown submenus.</p>
                    <div id="main-menu-container">
                        <?php foreach ($options['main_menu'] as $idx => $item) : ?>
                            <div class="menu-item-card" style="background:#fff; border:1px solid #ccd0d4; padding:15px; margin-bottom:15px; border-radius:4px;">
                                <div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">
                                    <strong>Item #<?php echo $idx + 1; ?></strong>
                                    <input type="hidden" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][id]" value="<?php echo esc_attr($item['id']); ?>" />
                                    <label><input type="checkbox" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][enabled]" value="1" <?php checked(!empty($item['enabled'])); ?> /> Enabled</label>
                                    <label><input type="checkbox" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][accent]" value="1" <?php checked(!empty($item['accent'])); ?> /> Accent Button Style</label>
                                    <button type="button" class="button remove-menu-card-btn" style="margin-left:auto; color:#a00;">Delete Item</button>
                                </div>
                                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:10px;">
                                    <div><label>English Label</label><input type="text" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][label_en]" value="<?php echo esc_attr($item['label_en']); ?>" class="large-text" /></div>
                                    <div><label>Bangla Label</label><input type="text" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][label_bn]" value="<?php echo esc_attr($item['label_bn']); ?>" class="large-text" /></div>
                                    <div><label>URL / Path (href)</label><input type="text" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][href]" value="<?php echo esc_attr($item['href']); ?>" class="large-text" /></div>
                                </div>

                                <!-- Submenu / Children -->
                                <div style="margin-top:15px; padding-left:15px; border-left:3px solid #2271b1;">
                                    <strong style="font-size:12px; color:#50575e;">Submenu Children Items:</strong>
                                    <table class="widefat fixed striped children-table" style="margin-top:5px; margin-bottom:5px;">
                                        <thead>
                                            <tr>
                                                <th style="width:60px;">Active</th>
                                                <th>Child EN Label</th>
                                                <th>Child BN Label</th>
                                                <th>URL (href)</th>
                                                <th style="width:60px;">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php if (!empty($item['children'])) : foreach ($item['children'] as $c_idx => $child) : ?>
                                                <tr>
                                                    <td>
                                                        <input type="hidden" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][children][<?php echo $c_idx; ?>][id]" value="<?php echo esc_attr($child['id']); ?>" />
                                                        <input type="checkbox" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][children][<?php echo $c_idx; ?>][enabled]" value="1" <?php checked(!empty($child['enabled'])); ?> />
                                                    </td>
                                                    <td><input type="text" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][children][<?php echo $c_idx; ?>][label_en]" value="<?php echo esc_attr($child['label_en']); ?>" class="large-text" /></td>
                                                    <td><input type="text" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][children][<?php echo $c_idx; ?>][label_bn]" value="<?php echo esc_attr($child['label_bn']); ?>" class="large-text" /></td>
                                                    <td><input type="text" name="<?php echo $this->option_key; ?>[main_menu][<?php echo $idx; ?>][children][<?php echo $c_idx; ?>][href]" value="<?php echo esc_attr($child['href']); ?>" class="large-text" /></td>
                                                    <td><button type="button" class="button remove-row-btn">X</button></td>
                                                </tr>
                                            <?php endforeach; endif; ?>
                                        </tbody>
                                    </table>
                                    <button type="button" class="button add-child-btn" data-parent-idx="<?php echo $idx; ?>">+ Add Submenu Child</button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <button type="button" class="button button-secondary" id="add-menu-item-btn">+ Add Main Navigation Item</button>

                <?php endif; ?>

                <?php submit_button('Save Alvero Settings'); ?>
            </form>
        </div>

        <script>
        jQuery(document).ready(function($) {
            // Media Uploader
            var mediaUploader;
            $('#upload-logo-btn').click(function(e) {
                e.preventDefault();
                if (mediaUploader) { mediaUploader.open(); return; }
                mediaUploader = wp.media({ title: 'Choose Alvero Store Logo', button: { text: 'Use as Logo' }, multiple: false });
                mediaUploader.on('select', function() {
                    var attachment = mediaUploader.state().get('selection').first().toJSON();
                    $('#logo_id').val(attachment.id);
                    $('#logo-preview').attr('src', attachment.url).show();
                    $('#remove-logo-btn').show();
                });
                mediaUploader.open();
            });
            $('#remove-logo-btn').click(function(e) {
                e.preventDefault();
                $('#logo_id').val('');
                $('#logo-preview').attr('src', '').hide();
                $(this).hide();
            });

            // Remove Row
            $(document).on('click', '.remove-row-btn', function() { $(this).closest('tr').remove(); });
            $(document).on('click', '.remove-menu-card-btn', function() { $(this).closest('.menu-item-card').remove(); });

            // Add Announcement Row
            $('#add-announcement-btn').click(function() {
                var idx = $('#announcements-table tbody tr').length;
                var html = '<tr>' +
                    '<td><input type="hidden" name="alvero_site_settings[announcements][' + idx + '][id]" value="anc-' + (idx+1) + '" /><input type="checkbox" name="alvero_site_settings[announcements][' + idx + '][enabled]" value="1" checked /></td>' +
                    '<td><input type="text" name="alvero_site_settings[announcements][' + idx + '][text_en]" value="" class="large-text" placeholder="English Announcement" /></td>' +
                    '<td><input type="text" name="alvero_site_settings[announcements][' + idx + '][text_bn]" value="" class="large-text" placeholder="Bangla Announcement" /></td>' +
                    '<td><button type="button" class="button remove-row-btn">Remove</button></td>' +
                    '</tr>';
                $('#announcements-table tbody').append(html);
            });

            // Add Main Menu Item
            $('#add-menu-item-btn').click(function() {
                var idx = $('#main-menu-container .menu-item-card').length;
                var html = '<div class="menu-item-card" style="background:#fff; border:1px solid #ccd0d4; padding:15px; margin-bottom:15px; border-radius:4px;">' +
                    '<div style="display:flex; gap:10px; align-items:center; margin-bottom:10px;">' +
                        '<strong>New Item #' + (idx+1) + '</strong>' +
                        '<input type="hidden" name="alvero_site_settings[main_menu][' + idx + '][id]" value="item-' + (idx+1) + '" />' +
                        '<label><input type="checkbox" name="alvero_site_settings[main_menu][' + idx + '][enabled]" value="1" checked /> Enabled</label>' +
                        '<label><input type="checkbox" name="alvero_site_settings[main_menu][' + idx + '][accent]" value="1" /> Accent Button Style</label>' +
                        '<button type="button" class="button remove-menu-card-btn" style="margin-left:auto; color:#a00;">Delete Item</button>' +
                    '</div>' +
                    '<div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:10px;">' +
                        '<div><label>English Label</label><input type="text" name="alvero_site_settings[main_menu][' + idx + '][label_en]" value="" class="large-text" /></div>' +
                        '<div><label>Bangla Label</label><input type="text" name="alvero_site_settings[main_menu][' + idx + '][label_bn]" value="" class="large-text" /></div>' +
                        '<div><label>URL / Path (href)</label><input type="text" name="alvero_site_settings[main_menu][' + idx + '][href]" value="/" class="large-text" /></div>' +
                    '</div>' +
                    '<div style="margin-top:15px; padding-left:15px; border-left:3px solid #2271b1;">' +
                        '<strong style="font-size:12px; color:#50575e;">Submenu Children Items:</strong>' +
                        '<table class="widefat fixed striped children-table" style="margin-top:5px; margin-bottom:5px;">' +
                            '<thead><tr><th style="width:60px;">Active</th><th>Child EN Label</th><th>Child BN Label</th><th>URL (href)</th><th style="width:60px;">Action</th></tr></thead>' +
                            '<tbody></tbody>' +
                        '</table>' +
                        '<button type="button" class="button add-child-btn" data-parent-idx="' + idx + '">+ Add Submenu Child</button>' +
                    '</div>' +
                '</div>';
                $('#main-menu-container').append(html);
            });

            // Add Child Row
            $(document).on('click', '.add-child-btn', function() {
                var parentCard = $(this).closest('.menu-item-card');
                var pIdx = $('#main-menu-container .menu-item-card').index(parentCard);
                var tbody = parentCard.find('.children-table tbody');
                var cIdx = tbody.find('tr').length;
                var html = '<tr>' +
                    '<td><input type="hidden" name="alvero_site_settings[main_menu][' + pIdx + '][children][' + cIdx + '][id]" value="sub-' + (pIdx+1) + '-' + (cIdx+1) + '" /><input type="checkbox" name="alvero_site_settings[main_menu][' + pIdx + '][children][' + cIdx + '][enabled]" value="1" checked /></td>' +
                    '<td><input type="text" name="alvero_site_settings[main_menu][' + pIdx + '][children][' + cIdx + '][label_en]" value="" class="large-text" /></td>' +
                    '<td><input type="text" name="alvero_site_settings[main_menu][' + pIdx + '][children][' + cIdx + '][label_bn]" value="" class="large-text" /></td>' +
                    '<td><input type="text" name="alvero_site_settings[main_menu][' + pIdx + '][children][' + cIdx + '][href]" value="/" class="large-text" /></td>' +
                    '<td><button type="button" class="button remove-row-btn">X</button></td>' +
                '</tr>';
                tbody.append(html);
            });
        });
        </script>
        <?php
    }

    public function register_rest_routes() {
        register_rest_route('alvero/v1', '/settings', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_rest_settings'),
            'permission_callback' => '__return_true',
        ));
    }

    public function get_rest_settings() {
        $options = wp_parse_args(get_option($this->option_key, array()), $this->get_default_settings());

        if (empty($options['announcements'])) $options['announcements'] = $this->get_default_announcements();
        if (empty($options['main_menu'])) $options['main_menu'] = $this->get_default_main_menu();

        $logo_url = null;
        if (!empty($options['logo_id'])) {
            $logo_url = wp_get_attachment_image_url($options['logo_id'], 'full');
        }

        return rest_ensure_response(array(
            'site' => array(
                'logo_url'     => $logo_url ? $logo_url : '/media/alvero-mark.png',
                'brand_name'   => $options['brand_name'],
                'descriptor'   => $options['descriptor'],
                'phone'        => $options['phone'],
                'whatsapp_url' => $options['whatsapp_url'],
                'email'        => $options['email'],
                'address'      => $options['address'],
                'social' => array(
                    'facebook'  => $options['facebook_url'],
                    'instagram' => $options['instagram_url'],
                    'tiktok'    => $options['tiktok_url'],
                ),
                'footer' => array(
                    'tagline_en'     => $options['tagline_en'],
                    'tagline_bn'     => $options['tagline_bn'],
                    'description_en' => $options['description_en'],
                    'description_bn' => $options['description_bn'],
                    'copyright'      => $options['copyright'],
                ),
            ),
            'navigation' => array(
                'announcements' => array_values(array_map(function($anc) {
                    return array(
                        'id'      => $anc['id'],
                        'text_en' => $anc['text_en'],
                        'text_bn' => $anc['text_bn'],
                        'enabled' => !empty($anc['enabled']),
                    );
                }, $options['announcements'])),
                'main_menu' => array_values(array_map(function($item) {
                    $children = array();
                    if (!empty($item['children']) && is_array($item['children'])) {
                        $children = array_values(array_map(function($child) {
                            return array(
                                'id'       => $child['id'],
                                'label_en' => $child['label_en'],
                                'label_bn' => $child['label_bn'],
                                'href'     => $child['href'],
                                'enabled'  => !empty($child['enabled']),
                                'accent'   => !empty($child['accent']),
                            );
                        }, $item['children']));
                    }
                    return array(
                        'id'       => $item['id'],
                        'label_en' => $item['label_en'],
                        'label_bn' => $item['label_bn'],
                        'href'     => $item['href'],
                        'enabled'  => !empty($item['enabled']),
                        'accent'   => !empty($item['accent']),
                        'children' => $children,
                    );
                }, $options['main_menu'])),
            )
        ));
    }
}

new Alvero_Site_Settings();
