define([
        'jquery',
        'd3',
        'src/chart/bar'
    ], function(
        $,
        d3,
        chart
    ) {
    'use strict';

    describe('Bar Chart with Tooltip', function() {
        var barChart, dataset, containerFixture, f;

        beforeEach(function() {
            dataset = [
                {
                    letter: 'A',
                    frequency: .08167
                },
                {
                    letter: 'B',
                    frequency: .01492
                },
                {
                    letter: 'C',
                    frequency: .02782
                },
                {
                    letter: 'D',
                    frequency: .04253
                },
                {
                    letter: 'E',
                    frequency: .12702
                },
                {
                    letter: 'F',
                    frequency: .02288
                },
                {
                    letter: 'G',
                    frequency: .02015
                },
                {
                    letter: 'H',
                    frequency: .06094
                },
                {
                    letter: 'I',
                    frequency: .06966
                },
                {
                    letter: 'J',
                    frequency: .00153
                },
                {
                    letter: 'K',
                    frequency: .00772
                },
                {
                    letter: 'L',
                    frequency: .04025
                },
                {
                    letter: 'M',
                    frequency: .02406
                },
                {
                    letter: 'N',
                    frequency: .06749
                },
                {
                    letter: 'O',
                    frequency: .07507
                },
                {
                    letter: 'P',
                    frequency: .01929
                },
                {
                    letter: 'Q',
                    frequency: .00095
                },
                {
                    letter: 'R',
                    frequency: .05987
                },
                {
                    letter: 'S',
                    frequency: .06327
                },
                {
                    letter: 'T',
                    frequency: .09056
                },
                {
                    letter: 'U',
                    frequency: .02758
                },
                {
                    letter: 'V',
                    frequency: .00978
                },
                {
                    letter: 'W',
                    frequency: .02360
                },
                {
                    letter: 'X',
                    frequency: .00150
                },
                {
                    letter: 'Y',
                    frequency: .01974
                },
                {
                    letter: 'Z',
                    frequency: .00074
                }
            ];
            barChart = chart();

            f = jasmine.getFixtures();
            f.fixturesPath = 'base/test/fixtures/';
            f.load('testContainer.html');

            containerFixture = d3.select('.test-container');
            containerFixture.datum(dataset).call(barChart);
        });

        afterEach(function() {
            containerFixture.remove();
        });

        it('should render a chart with minimal requirements', function() {
            expect(containerFixture.select('.bar-chart').empty()).toBeFalsy();
        });

        it('should render container, axis and chart groups', function() {
            expect(containerFixture.select('g.container-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.chart-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.x-axis-group').empty()).toBeFalsy();
            expect(containerFixture.select('g.y-axis-group').empty()).toBeFalsy();
        });

        it('should render an X and Y axis', function() {
            expect(containerFixture.select('.x-axis-group.axis').empty()).toBeFalsy();
            expect(containerFixture.select('.y-axis-group.axis').empty()).toBeFalsy();
        });

        it('should render a bar for each data entry', function() {
            var numBars = dataset.length;

            expect(containerFixture.selectAll('.bar').size()).toEqual(numBars);
        });

        describe('API', function() {
            it('should provide margin getter and setter', function(){
                var previous = barChart.margin(),
                    expected = {top: 4, right: 4, bottom: 4, left: 4},
                    actual;

                barChart.margin(expected);
                actual = barChart.margin();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide width getter and setter', function() {
                var previous = barChart.width(),
                    expected = 200,
                    actual;

                barChart.width(expected);
                actual = barChart.width();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });

            it('should provide height getter and setter', function() {
                var previous = barChart.height(),
                    expected = 200,
                    actual;

                barChart.height(expected);
                actual = barChart.height();

                expect(previous).not.toBe(expected);
                expect(actual).toBe(expected);
            });
        });

        describe('when hovering a bar', function() {
            it('should trigger a callback', function() {
                var bar = containerFixture.selectAll('.bar:nth-child(1)');
                var callbackSpy = jasmine.createSpy("callback");

                barChart.on('customMouseOver', callbackSpy);
                bar.dispatch('mouseover');

                expect(callbackSpy).toHaveBeenCalled();
            });
        });
    });
});
