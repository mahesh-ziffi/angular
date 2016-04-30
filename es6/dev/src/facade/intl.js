export var NumberFormatStyle;
(function (NumberFormatStyle) {
    NumberFormatStyle[NumberFormatStyle["Decimal"] = 0] = "Decimal";
    NumberFormatStyle[NumberFormatStyle["Percent"] = 1] = "Percent";
    NumberFormatStyle[NumberFormatStyle["Currency"] = 2] = "Currency";
})(NumberFormatStyle || (NumberFormatStyle = {}));
export class NumberFormatter {
    static format(num, locale, style, { minimumIntegerDigits = 1, minimumFractionDigits = 0, maximumFractionDigits = 3, currency, currencyAsSymbol = false } = {}) {
        var intlOptions = {
            minimumIntegerDigits: minimumIntegerDigits,
            minimumFractionDigits: minimumFractionDigits,
            maximumFractionDigits: maximumFractionDigits
        };
        intlOptions.style = NumberFormatStyle[style].toLowerCase();
        if (style == NumberFormatStyle.Currency) {
            intlOptions.currency = currency;
            intlOptions.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
        }
        return new Intl.NumberFormat(locale, intlOptions).format(num);
    }
}
function digitCondition(len) {
    return len == 2 ? '2-digit' : 'numeric';
}
function nameCondition(len) {
    return len < 4 ? 'short' : 'long';
}
function extractComponents(pattern) {
    var ret = {};
    var i = 0, j;
    while (i < pattern.length) {
        j = i;
        while (j < pattern.length && pattern[j] == pattern[i])
            j++;
        let len = j - i;
        switch (pattern[i]) {
            case 'G':
                ret.era = nameCondition(len);
                break;
            case 'y':
                ret.year = digitCondition(len);
                break;
            case 'M':
                if (len >= 3)
                    ret.month = nameCondition(len);
                else
                    ret.month = digitCondition(len);
                break;
            case 'd':
                ret.day = digitCondition(len);
                break;
            case 'E':
                ret.weekday = nameCondition(len);
                break;
            case 'j':
                ret.hour = digitCondition(len);
                break;
            case 'h':
                ret.hour = digitCondition(len);
                ret.hour12 = true;
                break;
            case 'H':
                ret.hour = digitCondition(len);
                ret.hour12 = false;
                break;
            case 'm':
                ret.minute = digitCondition(len);
                break;
            case 's':
                ret.second = digitCondition(len);
                break;
            case 'z':
                ret.timeZoneName = 'long';
                break;
            case 'Z':
                ret.timeZoneName = 'short';
                break;
        }
        i = j;
    }
    return ret;
}
var dateFormatterCache = new Map();
export class DateFormatter {
    static format(date, locale, pattern) {
        var key = locale + pattern;
        if (dateFormatterCache.has(key)) {
            return dateFormatterCache.get(key).format(date);
        }
        var formatter = new Intl.DateTimeFormat(locale, extractComponents(pattern));
        dateFormatterCache.set(key, formatter);
        return formatter.format(date);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50bC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtdXhnS3lzTzgudG1wL2FuZ3VsYXIyL3NyYy9mYWNhZGUvaW50bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQ0EsV0FBWSxpQkFJWDtBQUpELFdBQVksaUJBQWlCO0lBQzNCLCtEQUFPLENBQUE7SUFDUCwrREFBTyxDQUFBO0lBQ1AsaUVBQVEsQ0FBQTtBQUNWLENBQUMsRUFKVyxpQkFBaUIsS0FBakIsaUJBQWlCLFFBSTVCO0FBRUQ7SUFDRSxPQUFPLE1BQU0sQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFFLEtBQXdCLEVBQ3JELEVBQUMsb0JBQW9CLEdBQUcsQ0FBQyxFQUFFLHFCQUFxQixHQUFHLENBQUMsRUFBRSxxQkFBcUIsR0FBRyxDQUFDLEVBQzlFLFFBQVEsRUFBRSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUMsR0FNaEMsRUFBRTtRQUNsQixJQUFJLFdBQVcsR0FBNkI7WUFDMUMsb0JBQW9CLEVBQUUsb0JBQW9CO1lBQzFDLHFCQUFxQixFQUFFLHFCQUFxQjtZQUM1QyxxQkFBcUIsRUFBRSxxQkFBcUI7U0FDN0MsQ0FBQztRQUNGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0QsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEMsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDaEMsV0FBVyxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3JFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQztB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QStCLENBQUM7QUFFbEc7SUFDRSxPQUFPLE1BQU0sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLE9BQWU7UUFDdkQsSUFBSSxHQUFHLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUUsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0FBQ0gsQ0FBQztBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBNb2RpZmllZCB2ZXJzaW9uIG9mIGludGVybmFsIFR5cGVzY3JpcHQgaW50bC5kLnRzLlxuLy8gVE9ETyhwaWxvb3Bpbik6IHJlbW92ZSB3aGVuIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMzUyMSBpcyBzaGlwcGVkLlxuZGVjbGFyZSBtb2R1bGUgSW50bCB7XG4gIGludGVyZmFjZSBOdW1iZXJGb3JtYXRPcHRpb25zIHtcbiAgICBsb2NhbGVNYXRjaGVyPzogc3RyaW5nO1xuICAgIHN0eWxlPzogc3RyaW5nO1xuICAgIGN1cnJlbmN5Pzogc3RyaW5nO1xuICAgIGN1cnJlbmN5RGlzcGxheT86IHN0cmluZztcbiAgICB1c2VHcm91cGluZz86IGJvb2xlYW47XG4gICAgbWluaW11bUludGVnZXJEaWdpdHM/OiBudW1iZXI7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzPzogbnVtYmVyO1xuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0cz86IG51bWJlcjtcbiAgfVxuXG4gIGludGVyZmFjZSBOdW1iZXJGb3JtYXQge1xuICAgIGZvcm1hdCh2YWx1ZTogbnVtYmVyKTogc3RyaW5nO1xuICB9XG5cbiAgdmFyIE51bWJlckZvcm1hdDoge25ldyAobG9jYWxlPzogc3RyaW5nLCBvcHRpb25zPzogTnVtYmVyRm9ybWF0T3B0aW9ucyk6IE51bWJlckZvcm1hdH07XG5cbiAgaW50ZXJmYWNlIERhdGVUaW1lRm9ybWF0T3B0aW9ucyB7XG4gICAgbG9jYWxlTWF0Y2hlcj86IHN0cmluZztcbiAgICB3ZWVrZGF5Pzogc3RyaW5nO1xuICAgIGVyYT86IHN0cmluZztcbiAgICB5ZWFyPzogc3RyaW5nO1xuICAgIG1vbnRoPzogc3RyaW5nO1xuICAgIGRheT86IHN0cmluZztcbiAgICBob3VyPzogc3RyaW5nO1xuICAgIG1pbnV0ZT86IHN0cmluZztcbiAgICBzZWNvbmQ/OiBzdHJpbmc7XG4gICAgdGltZVpvbmVOYW1lPzogc3RyaW5nO1xuICAgIGZvcm1hdE1hdGNoZXI/OiBzdHJpbmc7XG4gICAgaG91cjEyPzogYm9vbGVhbjtcbiAgfVxuXG4gIGludGVyZmFjZSBEYXRlVGltZUZvcm1hdCB7XG4gICAgZm9ybWF0KGRhdGU/OiBEYXRlIHwgbnVtYmVyKTogc3RyaW5nO1xuICB9XG5cbiAgdmFyIERhdGVUaW1lRm9ybWF0OiB7bmV3IChsb2NhbGU/OiBzdHJpbmcsIG9wdGlvbnM/OiBEYXRlVGltZUZvcm1hdE9wdGlvbnMpOiBEYXRlVGltZUZvcm1hdH07XG59XG5cbmV4cG9ydCBlbnVtIE51bWJlckZvcm1hdFN0eWxlIHtcbiAgRGVjaW1hbCxcbiAgUGVyY2VudCxcbiAgQ3VycmVuY3lcbn1cblxuZXhwb3J0IGNsYXNzIE51bWJlckZvcm1hdHRlciB7XG4gIHN0YXRpYyBmb3JtYXQobnVtOiBudW1iZXIsIGxvY2FsZTogc3RyaW5nLCBzdHlsZTogTnVtYmVyRm9ybWF0U3R5bGUsXG4gICAgICAgICAgICAgICAge21pbmltdW1JbnRlZ2VyRGlnaXRzID0gMSwgbWluaW11bUZyYWN0aW9uRGlnaXRzID0gMCwgbWF4aW11bUZyYWN0aW9uRGlnaXRzID0gMyxcbiAgICAgICAgICAgICAgICAgY3VycmVuY3ksIGN1cnJlbmN5QXNTeW1ib2wgPSBmYWxzZX06IHtcbiAgICAgICAgICAgICAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzPzogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzPzogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzPzogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgY3VycmVuY3k/OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICBjdXJyZW5jeUFzU3ltYm9sPzogYm9vbGVhblxuICAgICAgICAgICAgICAgIH0gPSB7fSk6IHN0cmluZyB7XG4gICAgdmFyIGludGxPcHRpb25zOiBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogbWluaW11bUludGVnZXJEaWdpdHMsXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IG1pbmltdW1GcmFjdGlvbkRpZ2l0cyxcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogbWF4aW11bUZyYWN0aW9uRGlnaXRzXG4gICAgfTtcbiAgICBpbnRsT3B0aW9ucy5zdHlsZSA9IE51bWJlckZvcm1hdFN0eWxlW3N0eWxlXS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChzdHlsZSA9PSBOdW1iZXJGb3JtYXRTdHlsZS5DdXJyZW5jeSkge1xuICAgICAgaW50bE9wdGlvbnMuY3VycmVuY3kgPSBjdXJyZW5jeTtcbiAgICAgIGludGxPcHRpb25zLmN1cnJlbmN5RGlzcGxheSA9IGN1cnJlbmN5QXNTeW1ib2wgPyAnc3ltYm9sJyA6ICdjb2RlJztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIGludGxPcHRpb25zKS5mb3JtYXQobnVtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkaWdpdENvbmRpdGlvbihsZW46IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBsZW4gPT0gMiA/ICcyLWRpZ2l0JyA6ICdudW1lcmljJztcbn1cbmZ1bmN0aW9uIG5hbWVDb25kaXRpb24obGVuOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gbGVuIDwgNCA/ICdzaG9ydCcgOiAnbG9uZyc7XG59XG5mdW5jdGlvbiBleHRyYWN0Q29tcG9uZW50cyhwYXR0ZXJuOiBzdHJpbmcpOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyB7XG4gIHZhciByZXQ6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zID0ge307XG4gIHZhciBpID0gMCwgajtcbiAgd2hpbGUgKGkgPCBwYXR0ZXJuLmxlbmd0aCkge1xuICAgIGogPSBpO1xuICAgIHdoaWxlIChqIDwgcGF0dGVybi5sZW5ndGggJiYgcGF0dGVybltqXSA9PSBwYXR0ZXJuW2ldKSBqKys7XG4gICAgbGV0IGxlbiA9IGogLSBpO1xuICAgIHN3aXRjaCAocGF0dGVybltpXSkge1xuICAgICAgY2FzZSAnRyc6XG4gICAgICAgIHJldC5lcmEgPSBuYW1lQ29uZGl0aW9uKGxlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneSc6XG4gICAgICAgIHJldC55ZWFyID0gZGlnaXRDb25kaXRpb24obGVuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdNJzpcbiAgICAgICAgaWYgKGxlbiA+PSAzKVxuICAgICAgICAgIHJldC5tb250aCA9IG5hbWVDb25kaXRpb24obGVuKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldC5tb250aCA9IGRpZ2l0Q29uZGl0aW9uKGxlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZCc6XG4gICAgICAgIHJldC5kYXkgPSBkaWdpdENvbmRpdGlvbihsZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICByZXQud2Vla2RheSA9IG5hbWVDb25kaXRpb24obGVuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdqJzpcbiAgICAgICAgcmV0LmhvdXIgPSBkaWdpdENvbmRpdGlvbihsZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2gnOlxuICAgICAgICByZXQuaG91ciA9IGRpZ2l0Q29uZGl0aW9uKGxlbik7XG4gICAgICAgIHJldC5ob3VyMTIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0gnOlxuICAgICAgICByZXQuaG91ciA9IGRpZ2l0Q29uZGl0aW9uKGxlbik7XG4gICAgICAgIHJldC5ob3VyMTIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtJzpcbiAgICAgICAgcmV0Lm1pbnV0ZSA9IGRpZ2l0Q29uZGl0aW9uKGxlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncyc6XG4gICAgICAgIHJldC5zZWNvbmQgPSBkaWdpdENvbmRpdGlvbihsZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3onOlxuICAgICAgICByZXQudGltZVpvbmVOYW1lID0gJ2xvbmcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1onOlxuICAgICAgICByZXQudGltZVpvbmVOYW1lID0gJ3Nob3J0JztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGkgPSBqO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbnZhciBkYXRlRm9ybWF0dGVyQ2FjaGU6IE1hcDxzdHJpbmcsIEludGwuRGF0ZVRpbWVGb3JtYXQ+ID0gbmV3IE1hcDxzdHJpbmcsIEludGwuRGF0ZVRpbWVGb3JtYXQ+KCk7XG5cbmV4cG9ydCBjbGFzcyBEYXRlRm9ybWF0dGVyIHtcbiAgc3RhdGljIGZvcm1hdChkYXRlOiBEYXRlLCBsb2NhbGU6IHN0cmluZywgcGF0dGVybjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB2YXIga2V5ID0gbG9jYWxlICsgcGF0dGVybjtcbiAgICBpZiAoZGF0ZUZvcm1hdHRlckNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gZGF0ZUZvcm1hdHRlckNhY2hlLmdldChrZXkpLmZvcm1hdChkYXRlKTtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZXh0cmFjdENvbXBvbmVudHMocGF0dGVybikpO1xuICAgIGRhdGVGb3JtYXR0ZXJDYWNoZS5zZXQoa2V5LCBmb3JtYXR0ZXIpO1xuICAgIHJldHVybiBmb3JtYXR0ZXIuZm9ybWF0KGRhdGUpO1xuICB9XG59XG4iXX0=