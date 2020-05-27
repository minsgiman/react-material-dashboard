# builder pattern

```javascript
class Frog {
    constructor(name, gender, eyes, legs, scent, tongue, heart, weight, height) {
        this.name = name
        this.gender = gender
        this.eyes = eyes
        this.legs = legs
        this.scent = scent
        this.tongue = tongue
        this.heart = heart
        if (weight) {
            this.weight = weight
        }
        if (height) {
            this.height = height
        }
    }
}

class FrogBuilder {
    constructor(name, gender) {
        // Ensure that the first character is always capitalized
        this.name = name.charAt(0).toUpperCase() + name.slice(1)
        this.gender = gender
    }

    formatEyes(eyes) {
        return Array.isArray(eyes) ? { left: eyes[0], right: eyes[1] } : eyes
    }

    setEyes(eyes) {
        this.eyes = this.formatEyes(eyes)
        return this
    }

    setLegs(legs) {
        if (!Array.isArray(legs)) {
            throw new Error('"legs" is not an array')
        }
        this.legs = legs
        return this
    }

    setScent(scent) {
        this.scent = scent
        return this
    }

    setTongue(tongue) {
        this.tongue = tongue
        return this
    }

    setHeart(heart) {
        this.heart = heart
        return this
    }

    setWeight(weight) {
        if (typeof weight !== 'undefined') {
            this.weight = weight
        }
        return this
    }

    setHeight(height) {
        if (typeof height !== 'undefined') {
            this.height = height
        }
        return this
    }

    build() {
        return new Frog(
            this.name,
            this.gender,
            this.eyes,
            this.legs,
            this.scent,
            this.tongue,
            this.heart,
            this.weight,
            this.height,
        )
    }
}

const larry = new FrogBuilder('larry', 'male')
    .setEyes([{ volume: 1.1 }, { volume: 1.12 }])
    .setScent('sweaty socks')
    .setHeart({ rate: 22 })
    .setWeight(6)
    .setHeight(3.5)
    .setLegs([
        { size: 'small' },
        { size: 'small' },
        { size: 'small' },
        { size: 'small' }
    ])
    .setTongue({ tongueWidth: 18, color: 'dark red', type: 'round' })
    .build()
```