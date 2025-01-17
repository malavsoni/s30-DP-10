// SC: O(kn)
// TC: O(n^k)
function superEggDrop(k: number, n: number): number {
  let memo: number[][] = Array.from({ length: n + 1 }, () =>
    Array(k + 1).fill(-1)
  );
  function helper(eggs: number, floor: number): number {
    if (floor <= 1 || eggs <= 1) return floor;

    if (memo[floor][eggs] != -1) return memo[floor][eggs];

    let minAttempt = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i <= floor; i++) {
      let breakScenario = 1 + superEggDrop(eggs - 1, i - 1);
      let noBreakScenario = 1 + superEggDrop(eggs, floor - i);
      let worstCase = Math.max(breakScenario, noBreakScenario);
      minAttempt = Math.min(worstCase, minAttempt);
    }
    memo[floor][eggs] = minAttempt;
    return minAttempt;
  }
  return helper(k, n);
}

// SC: O(kn)
// TC: O(kn)
function superEggDrop_efficient(k: number, n: number): number {
  let memo: number[][] = Array.from({ length: n + 1 }, () =>
    Array(k + 1).fill(0)
  );
  let attempt = 0;
  while (memo[attempt][k] < n) {
    attempt++;
    for (let egg = 1; egg <= k; egg++) {
      memo[attempt][egg] =
        1 + memo[attempt - 1][egg - 1] + memo[attempt - 1][egg];
    }
  }
  return attempt;
}

describe("887. Super Egg Drop", () => {
  it("Happy Path - 01", () => {
    expect(superEggDrop(2, 6)).toEqual(3);
    expect(superEggDrop_efficient(2, 6)).toEqual(3);
  });
});
