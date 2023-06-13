# MANUAL

- run tauri app on dev mode

```
npm run tauri dev
```

- run webapp only

```
npm run dev
```

# TODO
- Forward Compat
  - add regain spell 
  - add prepare step
- Grimoire Reimplementations
  - remove cast column, use badges and icons instead
    - icon for bonus action and reaction
    - badges for irregular times
  - show current concentration
  - ritual casting (add concentration without spending a slot)
  - filters
    - nonconcentration
    - blindness
    - components
- normalize spells
  - concentration nonopitonal
  - areas as first class column
  - sight-only
- Spell Control
  - add spells
  - edit spells
  - marked & rough annotation rewrite?
- Coolness
  - add brand, somewhere.
  - add splash screen illusory dragon
  - cool icons like [these](https://donjon.bin.sh/5e/quickref/)
    - status icons
    - range area indicators
    - better spell slot indicators
      - on modal
      - on button
  - character portraits
- spell description should enrich with elements
  - add Spellcasting Ability?
  - dice roller (threejs)
  - icons for status effects
  - bold for things like
    - enemy that you see
- keyboard shortcuts
- available spells
- empty screens
  - "Learn Spells"
  - "Create Character"
- Learned spells limit
- gamification
  - animations
    - cool hovers
    - confeti when cast is made (tsParticles)
- settings
    - compact vs dense - button sizes?
    - animation disable
    - darkmode
    - colors?
- Multiclassing support
- spell references
  - [donjon](https://donjon.bin.sh/5e/spells/)
  - [grimoire](https://raw.githubusercontent.com/avshyz/grimoire/main/src/data.ts?token=GHSAT0AAAAAACCMZTMJSYHEFD2U2FCMAZFMZDZ2QWA)

# On the shoulder of giants
- [PaperCSS](https://www.getpapercss.com/docs/content/typography/) and [SPaper](https://oli8.github.io/spaper/?ref=madewithsvelte.com#/components/Checkbox)
- SRD Spells from [here](https://github.com/vorpalhex/srd_spells)
