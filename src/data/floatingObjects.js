const iconImports = import.meta.glob('../assets/pixelIcons/*.{png,jpg,webp,svg}', { eager: true, import: 'default' });

export const floatingObjects = Object.values(iconImports);
