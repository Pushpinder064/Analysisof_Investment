const calculateDynamicAllocation = (req, res) => {
    const { totalInvestment, expectedReturn, riskTolerance, investmentPeriod } = req.body;

    // Define average annual returns for each sector
    const sectorReturns = {
        large: 0.12,  // 12% for large cap
        mid: 0.16,    // 16% for mid cap
        small: 0.18   // 18% for small cap
    };

    // Calculate the required annual return using the expected return and investment period
    const targetAnnualReturn = Math.pow(1 + expectedReturn / 100, 1 / investmentPeriod) - 1;

    // Initial risk-based rough allocation - this will be dynamically adjusted
    let initialWeights = {
        large: 0.4,
        mid: 0.35,
        small: 0.25
    };

    // Adjust initial weights based on risk tolerance
    if (riskTolerance.toLowerCase() === 'high') {
        initialWeights = { large: 0.2, mid: 0.3, small: 0.5 };
    } else if (riskTolerance.toLowerCase() === 'low') {
        initialWeights = { large: 0.7, mid: 0.25, small: 0.05 };
    }

    // Dynamic adjustment of weights to reach the target return
    let [largeWeight, midWeight, smallWeight] = [initialWeights.large, initialWeights.mid, initialWeights.small];
    let achievedReturn = 0;
    const tolerance = 0.0001;  // Small tolerance for return accuracy

    // Use a loop to adjust the weights based on the investment amount and time span
    while (Math.abs(achievedReturn - targetAnnualReturn) > tolerance) {
        achievedReturn = 
            (largeWeight * sectorReturns.large) +
            (midWeight * sectorReturns.mid) +
            (smallWeight * sectorReturns.small);

        // Adjust weights based on whether the achieved return is above or below the target
        if (achievedReturn < targetAnnualReturn) {
            // Increase weight in sectors with higher return to boost overall portfolio return
            largeWeight -= 0.01;
            midWeight += 0.005;
            smallWeight += 0.005;
        } else {
            // Decrease weight in high-risk sectors if target is exceeded
            largeWeight += 0.005;
            midWeight -= 0.005;
            smallWeight -= 0.01;
        }

        // Normalize weights to ensure they add up to 1
        const totalWeight = largeWeight + midWeight + smallWeight;
        largeWeight /= totalWeight;
        midWeight /= totalWeight;
        smallWeight /= totalWeight;
    }

    // Calculate actual investment amounts for each sector
    const largeCapInvestment = totalInvestment * largeWeight;
    const midCapInvestment = totalInvestment * midWeight;
    const smallCapInvestment = totalInvestment * smallWeight;

    // Return response with dynamic allocations and achieved return
    res.json({
        allocation: [
             (largeWeight * 100).toFixed(2),
             (midWeight * 100).toFixed(2),
             (smallWeight * 100).toFixed(2)
        ],
        investments: [
             largeCapInvestment.toFixed(2),
             midCapInvestment.toFixed(2),
             smallCapInvestment.toFixed(2)
        ],
        achievedAnnualReturn: (achievedReturn * 100).toFixed(2) + '%',
        requiredAnnualReturn: (targetAnnualReturn * 100).toFixed(2) + '%'
    });
};

module.exports = calculateDynamicAllocation;



