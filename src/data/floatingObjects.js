const iconImports = import.meta.glob('../assets/pixel icons/*.{png,jpg,jpeg,svg}', { eager: true, import: 'default' });

export const floatingObjects = Object.values(iconImports);
