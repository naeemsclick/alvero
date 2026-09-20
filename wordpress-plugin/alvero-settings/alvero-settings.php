<?php
/**
 * Plugin Name: Alvero Site Settings
 * Plugin URI: https://alvero.com.bd
 * Description: Native site settings management (Logo, Contact, Social, Footer) for Alvero Hair Solutions headless Next.js frontend.
 * Version: 1.0.0
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
        );
    }

    public function sanitize_settings($input) {
        if (!current_user_can('manage_options')) {
            return get_option($this->option_key);
        }

        $defaults = $this->get_default_settings();
        $output = array();

        $output['brand_name'] = isset($input['brand_name']) ? sanitize_text_field($input['brand_name']) : $defaults['brand_name'];
        $output['descriptor'] = isset($input['descriptor']) ? sanitize_text_field($input['descriptor']) : $defaults['descriptor'];
        $output['logo_id'] = isset($input['logo_id']) ? absint($input['logo_id']) : '';
        $output['phone'] = isset($input['phone']) ? sanitize_text_field($input['phone']) : $defaults['phone'];
        $output['whatsapp_url'] = isset($input['whatsapp_url']) ? esc_url_raw($input['whatsapp_url']) : $defaults['whatsapp_url'];
        $output['email'] = isset($input['email']) ? sanitize_email($input['email']) : $defaults['email'];
        $output['address'] = isset($input['address']) ? sanitize_text_field($input['address']) : $defaults['address'];
        $output['facebook_url'] = isset($input['facebook_url']) ? esc_url_raw($input['facebook_url']) : $defaults['facebook_url'];
        $output['instagram_url'] = isset($input['instagram_url']) ? esc_url_raw($input['instagram_url']) : $defaults['instagram_url'];
        $output['tiktok_url'] = isset($input['tiktok_url']) ? esc_url_raw($input['tiktok_url']) : $defaults['tiktok_url'];
        $output['tagline_en'] = isset($input['tagline_en']) ? sanitize_text_field($input['tagline_en']) : $defaults['tagline_en'];
        $output['tagline_bn'] = isset($input['tagline_bn']) ? sanitize_text_field($input['tagline_bn']) : $defaults['tagline_bn'];
        $output['description_en'] = isset($input['description_en']) ? wp_kses_post($input['description_en']) : $defaults['description_en'];
        $output['description_bn'] = isset($input['description_bn']) ? wp_kses_post($input['description_bn']) : $defaults['description_bn'];
        $output['copyright'] = isset($input['copyright']) ? sanitize_text_field($input['copyright']) : $defaults['copyright'];

        return $output;
    }

    public function render_admin_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $options = wp_parse_args(get_option($this->option_key, array()), $this->get_default_settings());
        $logo_url = $options['logo_id'] ? wp_get_attachment_image_url($options['logo_id'], 'medium') : '';
        ?>
        <div class="wrap">
            <h1>🌿 Alvero Store Settings — Basic Site Settings</h1>
            <?php settings_errors(); ?>
            <form method="post" action="options.php">
                <?php
                settings_fields('alvero_settings_group');
                ?>
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
                <?php submit_button('Save Alvero Settings'); ?>
            </form>
        </div>
        <script>
        jQuery(document).ready(function($) {
            var mediaUploader;
            $('#upload-logo-btn').click(function(e) {
                e.preventDefault();
                if (mediaUploader) {
                    mediaUploader.open();
                    return;
                }
                mediaUploader = wp.media({
                    title: 'Choose Alvero Store Logo',
                    button: { text: 'Use as Logo' },
                    multiple: false
                });
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
            )
        ));
    }
}

new Alvero_Site_Settings();
