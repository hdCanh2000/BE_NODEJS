#include <bits/stdc++.h>
using namespace std;

int main() {
	int t; cin >> t;
	while(t--) {
		int k, budget; cin >> k >> budget;
		int a[k];
		for(int i = 0; i < k; i++) {
			cin >> a[i];
		}
		int count = 0;
		for(int i = 0; i < k; i++) {
			if(budget - a[i] >= 0) {
				count += 1;
				budget -= a[i];
			} else {
				continue;
			}
		}
		cout << count << endl;
	}
	return 0;
}

