namespace SpriteKind {
    export const ui = SpriteKind.create()
    export const armkind = SpriteKind.create()
    export const rifle = SpriteKind.create()
    export const nothin = SpriteKind.create()
    export const tempimage = SpriteKind.create()
    export const pistol = SpriteKind.create()
    export const grenade = SpriteKind.create()
    export const enemyrifleperson = SpriteKind.create()
    export const enemyriflebullet = SpriteKind.create()
    export const piercing = SpriteKind.create()
    export const enemyhitbox = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.piercing, SpriteKind.enemyrifleperson, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "Hp", randint(-30, -50))
})
sprites.onCreated(SpriteKind.piercing, function (sprite) {
    timer.after(randint(0, 750), function () {
        sprites.destroy(sprite)
    })
})
browserEvents.onWheel(function (dx, dy, dz) {
    if (dy < 0) {
        if (zoom < 1.5) {
            zoom += 0.5
        } else {
        	
        }
    } else if (dy > 0) {
        if (zoom > 0.5) {
            zoom += -0.5
        } else {
        	
        }
    }
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.enemyrifleperson, 500, function (sprite) {
    transformSprites.rotateSprite(sprite, spriteutils.radiansToDegrees(spriteutils.angleFrom(sprite, person)))
    if (spriteutils.distanceBetween(sprite, person) > 175) {
    	
    } else {
        sprite.setVelocity(0, 0)
        sprite.unfollow()
    }
    if (sprite.vx == 0 && sprite.vy == 0) {
        if (sight.isInSight(
        sprite,
        person,
        200,
        false
        )) {
            if (sprites.readDataNumber(sprite, "bulletsLeft") > 0 && sprites.readDataBoolean(sprite, "reloading") == false) {
                enemyrifleprojectile = sprites.create(img`
                    . . . . . 
                    . . . . . 
                    c c c c c 
                    . . . . . 
                    . . . . . 
                    `, SpriteKind.enemyriflebullet)
                scene.cameraShake(2, 200)
                spriteutils.placeAngleFrom(
                enemyrifleprojectile,
                spriteutils.angleFrom(sprite, person),
                25,
                sprite
                )
                spriteutils.setVelocityAtAngle(enemyrifleprojectile, spriteutils.angleFrom(sprite, person), 500)
                transformSprites.rotateSprite(enemyrifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(sprite, person)))
                sprites.changeDataNumberBy(sprite, "bulletsLeft", -1)
                explosiongsprite = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.nothin)
                spriteutils.placeAngleFrom(
                explosiongsprite,
                spriteutils.angleFrom(sprite, person),
                14,
                sprite
                )
                extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 20, 5)
                if (Math.percentChance(10)) {
                    sprite.setVelocity(randint(-20, 20), randint(-20, 20))
                    timer.after(500, function () {
                        sprite.setVelocity(0, 0)
                    })
                }
            }
        }
    } else {
    	
    }
    if (sprites.readDataNumber(sprite, "bulletsLeft") == 0 && sprites.readDataBoolean(sprite, "reloading") == false) {
        sprites.setDataBoolean(sprite, "reloading", true)
        timer.after(2000, function () {
            sprites.setDataNumber(sprite, "bulletsLeft", 30)
            sprites.setDataBoolean(sprite, "reloading", false)
        })
    }
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.gameOver(false)
})
browserEvents.R.onEvent(browserEvents.KeyEvent.Pressed, function () {
    if (!(browserEvents.MouseLeft.isPressed())) {
        if (!(reloading)) {
            if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 0) {
                if (!(riflemag_ammo == 30)) {
                    riflesubtraction = 30 - riflemag_ammo
                    if (rifletotal_ammo >= riflesubtraction) {
                        speed = 15
                        reloading = true
                        timer.after(2000, function () {
                            reloading = false
                            riflemag_ammo = 30
                            rifletotal_ammo += 0 - riflesubtraction
                        })
                    }
                } else {
                	
                }
            } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 1) {
                if (!(pistolmag_ammo == 18)) {
                    pistolsubtraction = 18 - pistolmag_ammo
                    if (pistoltotal_ammo >= pistolsubtraction) {
                        speed = 15
                        reloading = true
                        timer.after(2000, function () {
                            reloading = false
                            pistolmag_ammo = 18
                            pistoltotal_ammo += 0 - pistolsubtraction
                        })
                    }
                }
            } else {
            	
            }
        }
    } else {
    	
    }
})
browserEvents.onMouseMove(function (x, y) {
    mouseX = x
    mouseY = y
    mouse.setPosition(scene.cameraProperty(CameraProperty.Left) + mouseX, scene.cameraProperty(CameraProperty.Top) + mouseY)
})
sprites.onOverlap(SpriteKind.pistol, SpriteKind.enemyrifleperson, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "Hp", randint(-30, -50))
})
scene.onHitWall(SpriteKind.enemyriflebullet, function (sprite, location) {
    sprites.destroy(sprite)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.enemyriflebullet, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    healthbar.value += randint(-20, -30)
})
sprites.onCreated(SpriteKind.nothin, function (sprite) {
    timer.after(1000, function () {
        sprites.destroy(sprite)
    })
})
sprites.onOverlap(SpriteKind.rifle, SpriteKind.enemyrifleperson, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.changeDataNumberBy(otherSprite, "Hp", randint(-30, -50))
})
let dg = 0
let shrapnel: Sprite = null
let grenad: Sprite = null
let pistolprojectile: Sprite = null
let rifleprojectile: Sprite = null
let issprinting = false
let dy = 0
let dx = 0
let mouseY = 0
let mouseX = 0
let pistolsubtraction = 0
let riflesubtraction = 0
let reloading = false
let explosiongsprite: Sprite = null
let enemyrifleprojectile: Sprite = null
let zoom = 0
let enemyrifleguy: Sprite = null
let healthbar: StatusBarSprite = null
let toolbar: Inventory.Toolbar = null
let pistolmag_ammo = 0
let pistoltotal_ammo = 0
let speed = 0
let riflemag_ammo = 0
let rifletotal_ammo = 0
let mouse: Sprite = null
let person: Sprite = null
let scoped = false
scene.setBackgroundColor(7)
tiles.setCurrentTilemap(tilemap`level1`)
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
person = sprites.create(img`
    .........................
    ........fffffffff........
    ......ffbbbbbbbbbff......
    .....fbbbbbbbbbbbbbf.....
    ....fbbbbbbbbbbbbbbbf....
    ...fbbbbbbbbbbbbbbbbbf...
    ..fbbbbbbbbbbbbbbbbbbbf..
    ..fbbbbbbbbbbbbbbbbbbbf..
    .fbbbbbbbbbbbbbbbbbbbbbf.
    .fbbbbbbbbbbbbbbbbbbbbbf.
    .fbbbbbbbbbbbbbbbbbbbbbf.
    .fbbbbbbbbbbbbbbbbbbbbbf.
    .fbbbbbbbbbbbbbbbbbbbbbf.
    .fbbbbbbbbbbbbbbbbbbbbbf.
    .fbbbbbbbbbbbbbbbbbbbbbf.
    .fbbbbbbbbbbbbbbbbbbbbbf.
    .fbbbbbbbbbbbbbbbbbbbbbf.
    ..fbbbbbbbbbbbbbbbbbbbf..
    ..fbbbbbbbbbbbbbbbbbbbf..
    ...fbbbbbbbbbbbbbbbbbf...
    ....fbbbbbbbbbbbbbbbf....
    .....fbbbbbbbbbbbbbf.....
    ......ffbbbbbbbbbff......
    ........fffffffff........
    .........................
    `, SpriteKind.Player)
person.z = 100
tiles.placeOnTile(person, tiles.getTileLocation(8, 8))
scene.cameraFollowSprite(person)
mouse = sprites.create(img`
    . . . 1 . . . 
    . . . 1 . . . 
    . . 1 1 1 . . 
    1 1 1 . 1 1 1 
    . . 1 1 1 . . 
    . . . 1 . . . 
    . . . 1 . . . 
    `, SpriteKind.ui)
mouse.z = 200
let akpic = sprites.create(img`
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    eeee..cccccccccc..............
    eeeeeecffffffccfcccccccccccccf
    eeeeeecffffffccfcccccccccccccf
    eeee..cccccccccc..............
    .......bbbfbb.................
    .......bbbfbb.................
    ........bbbb..................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    `, SpriteKind.tempimage)
let gsh18pic = sprites.create(img`
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ........bbccccccccccccccc.....
    .......bbbccccccccccccccc.....
    .......bbbbbbc................
    .......bbbbbb.................
    .......bbbbbb.................
    ........bbbb..................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    `, SpriteKind.tempimage)
let f1pic = sprites.create(img`
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    .............bb...............
    .............bb...............
    ............fbbf..............
    ...........fcbbcf.............
    ........bbbfcffcf.............
    .......bbbbfcffbb.............
    .......bbbbfccbcb.............
    .......bbbbbffbbb.............
    .......bbbbbb.................
    ........bbbb..................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    `, SpriteKind.tempimage)
let emptypic = sprites.create(img`
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ........bbbb..................
    .......bbbbbb.................
    .......bbbbbb.................
    .......bbbbbb.................
    .......bbbbbb.................
    ........bbbb..................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    ..............................
    `, SpriteKind.tempimage)
rifletotal_ammo = 150
riflemag_ammo = 30
speed = 40
pistoltotal_ammo = 54
pistolmag_ammo = 18
let riflecanshoot = true
let pistolcanshoot = true
let grenadecanthrow = true
let item = Inventory.create_item("AK-47", img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . b . . . . . . . . . . 
    . . . c c c c c c c . . . . . b 
    e e e e c f f f b c c c c c c c 
    e e e . b c c c e e . . . . . . 
    e . . . b b . . e e e . . . . . 
    . . . . b . . . . e e . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
let item2 = Inventory.create_item("Gsh-18", img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . b b b b b b b b b b b b b . 
    . . b b b b b b b b b b b b b . 
    . . c c c c c c c c c c c c c . 
    . . . c c c . b f . . . . . . . 
    . . . c c c b . f . . . . . . . 
    . . c c c c f f . . . . . . . . 
    . . c c c c . . . . . . . . . . 
    . . c c c . . . . . . . . . . . 
    . . c c c . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
let item3 = Inventory.create_item("F-1", img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . b b . . . . . 
    . . . . . f f f b . . b . . . . 
    . . . . . f c c b c . b . . . . 
    . . . . . f f f f b b . . . . . 
    . . . . f c c c c f . c . . . . 
    . . . f c c c c c c f c . . . . 
    . . . f c c c c c c f . c . . . 
    . . . f f f f f f f f . . . . . 
    . . . f c c c c c c f . . . . . 
    . . . f c c c c c c f . . . . . 
    . . . . f c c c c f . . . . . . 
    . . . . . f f f f . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `)
let toolbarlist = [item, item2, item3]
toolbar = Inventory.create_toolbar(toolbarlist, 3)
toolbar.setScale(1.5, ScaleAnchor.Middle)
toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
toolbar.setPosition(160, 220)
emptypic.setFlag(SpriteFlag.Invisible, true)
akpic.setFlag(SpriteFlag.Invisible, false)
f1pic.setFlag(SpriteFlag.Invisible, true)
gsh18pic.setFlag(SpriteFlag.Invisible, true)
let grenades = 3
healthbar = statusbars.create(60, 8, StatusBarKind.Health)
healthbar.max = 200
healthbar.value = 200
healthbar.setLabel("HP")
healthbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
healthbar.setBarBorder(1, 15)
healthbar.setPosition(40, 230)
healthbar.setFlag(SpriteFlag.RelativeToCamera, true)
let mag_ammo_text = textsprite.create("")
let total_ammo_text = textsprite.create("")
mag_ammo_text.setFlag(SpriteFlag.RelativeToCamera, true)
total_ammo_text.setFlag(SpriteFlag.RelativeToCamera, true)
mag_ammo_text.setPosition(3, 210)
total_ammo_text.setPosition(3, 220)
for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
    tiles.setTileAt(value, assets.tile`myTile0`)
    enemyrifleguy = sprites.create(img`
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        ......................fffffffff........................
        ....................ffcccccccccff......................
        ...................fcccccccccccccf.....................
        ..................fcccccccccccccccf....................
        .................fcccccccccccccccccf...................
        ................fcccccccccccccccccccf..................
        ................fcccccccccccccccccccf..................
        ...............fcccccccccccccccccccccf.................
        ...............fcccccccccccccccccccccf.................
        ...............fcccccccccccccccccccccf.................
        ...............fcccccccccccccccccccccf.................
        ...............fcccccccccccccccccccccf.................
        ...............fcccccccccccccccccccccf.................
        ...............fcccccccccccccccccccccf.................
        ...............fcccccccccccccccccccccfccc..............
        ...............fcccccccccccccccccccccfcfcccccccccccccf.
        ................fcccccccccccccccccccfccfcccccccccccccf.
        ................fcccccccccccccccccccfcccc..............
        .................fcccccccccccccccccfbc.................
        ..................fcccccccccccccccfbbc.................
        ...................fcccccccccccccfbbc..................
        ....................ffcccccccccff......................
        ......................fffffffff........................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        .......................................................
        `, SpriteKind.enemyrifleperson)
    tiles.placeOnTile(enemyrifleguy, value)
    sprites.setDataNumber(enemyrifleguy, "Hp", 100)
    sprites.setDataNumber(enemyrifleguy, "bulletsLeft", 30)
    sprites.setDataBoolean(enemyrifleguy, "reloading", false)
}
game.onUpdate(function () {
    if (scoped) {
        mouse.setImage(img`
            . . . . 2 . . . . 
            . . . . 2 . . . . 
            . . . 2 2 2 . . . 
            . . 2 . . . 2 . . 
            2 2 2 . 2 . 2 2 2 
            . . 2 . . . 2 . . 
            . . . 2 2 2 . . . 
            . . . . 2 . . . . 
            . . . . 2 . . . . 
            `)
        dx = mouseX - 160
        dy = mouseY - 120
        scene.centerCameraAt(person.x + dx * zoom, person.y + dy * zoom)
    } else {
        scene.centerCameraAt(person.x, person.y)
        mouse.setImage(img`
            . . 1 . . 
            . . 1 . . 
            1 1 . 1 1 
            . . 1 . . 
            . . 1 . . 
            `)
    }
})
forever(function () {
    if (browserEvents.LeftShift.isPressed()) {
        scoped = true
    } else {
        scoped = false
    }
    if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 0) {
        emptypic.setFlag(SpriteFlag.Invisible, true)
        akpic.setFlag(SpriteFlag.Invisible, false)
        f1pic.setFlag(SpriteFlag.Invisible, true)
        gsh18pic.setFlag(SpriteFlag.Invisible, true)
        mag_ammo_text.setText("Ammo:" + convertToText(riflemag_ammo))
        total_ammo_text.setText("Total Ammo:" + convertToText(rifletotal_ammo))
    } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 1) {
        emptypic.setFlag(SpriteFlag.Invisible, true)
        akpic.setFlag(SpriteFlag.Invisible, true)
        f1pic.setFlag(SpriteFlag.Invisible, true)
        gsh18pic.setFlag(SpriteFlag.Invisible, false)
        mag_ammo_text.setText("Ammo:" + pistolmag_ammo)
        total_ammo_text.setText("Total Ammo:" + convertToText(pistoltotal_ammo))
    } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 2) {
        emptypic.setFlag(SpriteFlag.Invisible, true)
        akpic.setFlag(SpriteFlag.Invisible, true)
        f1pic.setFlag(SpriteFlag.Invisible, false)
        gsh18pic.setFlag(SpriteFlag.Invisible, true)
        mag_ammo_text.setText("Ammo:" + grenades)
        total_ammo_text.setText("Total Ammo:" + convertToText(grenades))
    } else {
        emptypic.setFlag(SpriteFlag.Invisible, false)
        akpic.setFlag(SpriteFlag.Invisible, true)
        f1pic.setFlag(SpriteFlag.Invisible, true)
        gsh18pic.setFlag(SpriteFlag.Invisible, true)
        mag_ammo_text.setText("Ammo:" + "")
        total_ammo_text.setText("Total Ammo:" + "")
    }
    if (browserEvents.LeftShift.isPressed()) {
        if (!(reloading)) {
            if (!(person.vx == 0 && person.vy == 0)) {
                issprinting = true
                speed = 75
            }
        }
    } else if (reloading) {
        speed = 15
    } else {
        issprinting = false
        speed = 40
    }
    if (browserEvents.MouseLeft.isPressed()) {
        if (!(reloading)) {
            if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 0) {
                if (riflecanshoot) {
                    if (riflemag_ammo > 0) {
                        if (issprinting) {
                            rifleprojectile = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                c c c c c 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.rifle)
                            spriteutils.placeAngleFrom(
                            rifleprojectile,
                            spriteutils.angleFrom(akpic, mouse),
                            14,
                            akpic
                            )
                            transformSprites.rotateSprite(rifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(akpic, mouse)) + randint(-3.5, 3.5))
                            spriteutils.setVelocityAtAngle(rifleprojectile, spriteutils.angleFrom(akpic, mouse) + spriteutils.degreesToRadians(randint(-3.5, 3.5)), 300)
                        } else {
                            rifleprojectile = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                c c c c c 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.rifle)
                            spriteutils.placeAngleFrom(
                            rifleprojectile,
                            spriteutils.angleFrom(akpic, mouse),
                            14,
                            akpic
                            )
                            transformSprites.rotateSprite(rifleprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(akpic, mouse)) + randint(-1, 1))
                            spriteutils.setVelocityAtAngle(rifleprojectile, spriteutils.angleFrom(akpic, mouse) + spriteutils.degreesToRadians(randint(-1, 1)), 300)
                        }
                        rifleprojectile.setFlag(SpriteFlag.AutoDestroy, false)
                        scene.cameraShake(2, 200)
                        explosiongsprite = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `, SpriteKind.nothin)
                        spriteutils.placeAngleFrom(
                        explosiongsprite,
                        spriteutils.angleFrom(akpic, mouse),
                        14,
                        akpic
                        )
                        extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 20, 5)
                        riflemag_ammo += -1
                        riflecanshoot = false
                        timer.after(100, function () {
                            riflecanshoot = true
                        })
                    }
                } else {
                	
                }
            } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 1) {
                if (pistolcanshoot) {
                    if (pistolmag_ammo > 0) {
                        if (issprinting) {
                            pistolprojectile = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                c c c c c 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.pistol)
                            spriteutils.placeAngleFrom(
                            pistolprojectile,
                            spriteutils.angleFrom(gsh18pic, mouse),
                            14,
                            gsh18pic
                            )
                            transformSprites.rotateSprite(pistolprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(gsh18pic, mouse)) + randint(-3.5, 3.5))
                            spriteutils.setVelocityAtAngle(pistolprojectile, spriteutils.angleFrom(gsh18pic, mouse) + spriteutils.degreesToRadians(randint(-3.5, 3.5)), 300)
                        } else {
                            pistolprojectile = sprites.create(img`
                                . . . . . 
                                . . . . . 
                                c c c c c 
                                . . . . . 
                                . . . . . 
                                `, SpriteKind.pistol)
                            spriteutils.placeAngleFrom(
                            pistolprojectile,
                            spriteutils.angleFrom(gsh18pic, mouse),
                            14,
                            gsh18pic
                            )
                            transformSprites.rotateSprite(pistolprojectile, spriteutils.radiansToDegrees(spriteutils.angleFrom(gsh18pic, mouse)) + randint(-1, 1))
                            spriteutils.setVelocityAtAngle(pistolprojectile, spriteutils.angleFrom(gsh18pic, mouse) + spriteutils.degreesToRadians(randint(-1, 1)), 300)
                        }
                        pistolprojectile.setFlag(SpriteFlag.AutoDestroy, false)
                        scene.cameraShake(2, 200)
                        explosiongsprite = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `, SpriteKind.nothin)
                        spriteutils.placeAngleFrom(
                        explosiongsprite,
                        spriteutils.angleFrom(gsh18pic, mouse),
                        14,
                        gsh18pic
                        )
                        extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 100, 20, 5)
                        pistolmag_ammo += -1
                        pistolcanshoot = false
                        timer.after(500, function () {
                            pistolcanshoot = true
                        })
                    }
                }
            } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) == 2) {
                if (grenadecanthrow) {
                    if (grenades > 0) {
                        grenad = sprites.create(img`
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . b b . . . . . 
                            . . . . . f f f b . . b . . . . 
                            . . . . . f c c b c . b . . . . 
                            . . . . . f f f f b b . . . . . 
                            . . . . f c c c c f . c . . . . 
                            . . . f c c c c c c f c . . . . 
                            . . . f c c c c c c f . c . . . 
                            . . . f f f f f f f f . . . . . 
                            . . . f c c c c c c f . . . . . 
                            . . . f c c c c c c f . . . . . 
                            . . . . f c c c c f . . . . . . 
                            . . . . . f f f f . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            . . . . . . . . . . . . . . . . 
                            `, SpriteKind.grenade)
                        spriteutils.placeAngleFrom(
                        grenad,
                        spriteutils.angleFrom(f1pic, mouse),
                        14,
                        f1pic
                        )
                        spriteutils.setVelocityAtAngle(grenad, spriteutils.angleFrom(f1pic, mouse) + spriteutils.degreesToRadians(randint(-5, 5)), 80)
                        grenad.fx = 50
                        grenad.fy = 50
                        grenades += -1
                        grenadecanthrow = false
                        timer.after(3000, function () {
                            timer.after(1500, function () {
                                grenadecanthrow = true
                                explosiongsprite = sprites.create(img`
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    `, SpriteKind.nothin)
                                spriteutils.placeAngleFrom(
                                explosiongsprite,
                                0,
                                0,
                                grenad
                                )
                                extraEffects.createSpreadEffectOnAnchor(explosiongsprite, extraEffects.createFullPresetsSpreadEffectData(ExtraEffectPresetColor.Fire, ExtraEffectPresetShape.Explosion), 1000, 90, 50)
                                for (let index = 0; index < 50; index++) {
                                    shrapnel = sprites.create(img`
                                        . . . . . . . . . . . . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        . . b . . . . . . . . . . . . . 
                                        . . . . . . . . . . c . . . f . 
                                        . . . . c . . . . . . . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        . . . . . . . . . . f . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        . . . . . . . b . . . . c . . . 
                                        . c . . . . . . . . . . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        . . . f . . . . . . . . . . . . 
                                        . . . . c . . . . . . . . b . . 
                                        . . . . . . . . . . . c . . . . 
                                        . . . . . . . . . . . . . . . . 
                                        `, SpriteKind.piercing)
                                    spriteutils.placeAngleFrom(
                                    shrapnel,
                                    0,
                                    0,
                                    grenad
                                    )
                                    spriteutils.setVelocityAtAngle(shrapnel, randint(0, 360), 100)
                                    shrapnel.fx = 40
                                    shrapnel.fy = 40
                                }
                                timer.background(function () {
                                    for (let value2 of spriteutils.getSpritesWithin(SpriteKind.Player, 60, grenad)) {
                                        healthbar.value += 0 - 120 * (1 - spriteutils.distanceBetween(person, value2) / 60)
                                    }
                                    for (let value22 of spriteutils.getSpritesWithin(SpriteKind.enemyrifleperson, 60, grenad)) {
                                        sprites.destroy(value22)
                                    }
                                    sprites.destroy(grenad)
                                })
                            })
                        })
                    } else {
                    	
                    }
                }
            } else {
            	
            }
        }
    }
    akpic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    emptypic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    f1pic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    gsh18pic.setPosition(person.x + Math.cos(spriteutils.degreesToRadians(dg)) * 20, person.y + Math.sin(spriteutils.degreesToRadians(dg)) * 20)
    dg = spriteutils.radiansToDegrees(spriteutils.angleFrom(person, mouse))
    transformSprites.rotateSprite(person, dg)
    transformSprites.rotateSprite(akpic, dg)
    transformSprites.rotateSprite(emptypic, dg)
    transformSprites.rotateSprite(f1pic, dg)
    transformSprites.rotateSprite(gsh18pic, dg)
    controller.moveSprite(person, speed, speed)
    for (let value3 of sprites.allOfKind(SpriteKind.enemyrifleperson)) {
        if (sprites.readDataNumber(value3, "Hp") <= 0) {
            sprites.destroy(value3)
        }
    }
})
