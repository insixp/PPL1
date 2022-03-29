import * as R from "ramda";

export const stringToArray = R.split("");


/* Question 1 */
export const countLetters: (s: string) => {} = R.pipe(
    R.toLower,
    stringToArray,
    R.filter(R.includes(R.__, "abcdefghijklmnopqrstuvwxyz")),
    R.countBy((x : string) : string => x)
)

/* Question 2 */
const charFilter : (s : string) => boolean = (s : string) : boolean => R.contains(s, "(){}[]")
const charFilterArr : (data : Array<string>) => Array<string> = (data : Array<string>) : Array<string> => R.filter(charFilter, data);
const pMatch = (openC : string, closeC : string) => (open : string | undefined, close : string) => R.and(close === closeC, open === openC);
const match = (open : string | undefined, close : string) => R.or(R.or(pMatch("(", ")")(open, close), pMatch("[", "]")(open, close)), pMatch("{", "}")(open, close));
const reducef = (acc : Array<string>, val : string) => match(R.head(acc), val) ? R.tail(acc) : R.prepend(val, acc);
const reducePar : (data : string) => Array<string> = (data : string) : Array<string> => R.reduce(reducef, [], charFilterArr(stringToArray(data)))

export const isPaired: (s: string) => boolean = (s: string) => R.isEmpty(reducePar(s))

/* Question 3 */
interface WordTree {
    root: string;
    children: WordTree[];
}

const concatFlat: (val : WordTree) => string = (val : WordTree) => R.isEmpty(val.children) ? val.root : val.root + " " + R.join(" ", R.map(concatFlat, val.children));
export const treeToSentence = (t: WordTree): string => concatFlat(t);