import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

import UnoCSS from '@unocss/vite';
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import presetAttributify from '@unocss/preset-attributify'
import presetTagify from '@unocss/preset-tagify'
import presetTypography from '@unocss/preset-typography'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetIcons from '@unocss/preset-icons'


const config: UserConfig = {
    plugins: [
        UnoCSS({
            mode: 'svelte-scoped',
            shortcuts: [
                { logo: 'i-logos:svelte-icon w-7em h-7em transform transition-300' },
            ],
            transformers: [
                transformerDirectives(),
            ],
            presets: [
                presetUno(),
                presetAttributify(),
                presetTagify(),
                presetTypography(),
                presetWebFonts(),
                presetIcons({
                    prefix: 'i-',
                    extraProperties: {
                        'display': 'inline-block',
                        'vertical-align': 'middle',
                    },
                }),
            ],
            safelist: ['bg-orange-300'],
        }),
        sveltekit()
    ]
};

export default config;
