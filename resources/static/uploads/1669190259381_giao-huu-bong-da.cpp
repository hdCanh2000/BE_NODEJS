#include <bits/stdc++.h>
using namespace std;

int giaithua(int n) {
	int res = 1;
	for(int i = 1; i<=n; i++) {
		res *= i;
	}
	return res;
}

int main() {
	int t; cin >> t;
	while(t--) {
		int x,y;
		cin >> x >> y;
		if(x == 0) cout << y << endl;
		else if(y == 0) cout << x << endl;
		else {
			int totalGoal = x+y;
			cout << giaithua(totalGoal) / (giaithua(x) * giaithua(y)) << endl;
		}
	}
	return 0;
}
