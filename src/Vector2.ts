class Vector2 {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }
    get y(): number {
        return this._y;
    }

    //Возвращает новое местоположение, полученное под воздействием векторной силы
    add(addedVector: Vector2): Vector2 {
        const newVector = new Vector2(this._x + addedVector.x, this._y + addedVector.y);
        return newVector;
    }

    //Возвращает вектор расстояния/направления между двумя местоположениями
    sub(deductibleVector: Vector2): Vector2 {
        const newVector = new Vector2(this._x - deductibleVector.x, this._y - deductibleVector.y);
        return newVector;
    }
    
    mult(scale: number): Vector2 {
        const newVector = new Vector2(this._x * scale, this._y * scale);
        return newVector;
    }

    div(divider: number): Vector2 {
        return new Vector2(this._x / divider, this._y / divider);
    }
    
    magnitude(): number {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    normalize(): Vector2 {
        const magnitude = this.magnitude();
        const normalizeVector = new Vector2(this._x / magnitude, this._y / magnitude);
        return normalizeVector;
    }

    setMagnitude(magnitude: number): Vector2 {
        return this.normalize().mult(magnitude);
    }

    limit(limitNum: number): Vector2 {
        if(this.magnitude() > limitNum && limitNum !== -1) {
           return this.setMagnitude(limitNum);
        }

        return this;
    }

    reverse(): Vector2 {
        return this.mult(-1);
    }

    moveX(xAdd: number) {
        return new Vector2(this._x + xAdd, this._y);
    }

    moveY(yAdd: number) {
        return new Vector2(this._x, this._y + yAdd);
    }

    lessThen(vector: Vector2): boolean {
        if(this._x < vector.x && this._y < vector.y) {
            return true;
        }

        return false;
    }

    direction(vector: Vector2): Vector2 {
        return vector.sub(this).normalize();
    }

    distance(vector: Vector2): number {
        return vector.sub(this).magnitude();
    }

    


    static random(): Vector2 {
        return new Vector2(Math.random(), Math.random());
    }

    static zero(): Vector2 {
        return new Vector2(0, 0);
    }

    toString(): string {
        return `(x: ${this._x}; y: ${this._y})`;
    }
}

export default Vector2;